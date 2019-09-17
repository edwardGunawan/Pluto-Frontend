import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';

import {connect} from 'react-redux';

import {fetchUserInTeam, populateTeamName} from '../../redux/actions/teamAction';
import { fetchUserEvents, updateEvent, deleteEvents, createEvent} from '../../redux/actions/eventsAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import uuid from 'uuid';

import Modal from '../Common/Modal';

import DropDown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert';
import SelectInput from '../Common/SelectInput';
import DropDownButton from 'react-bootstrap/DropdownButton';
import colorSelection from '../util/ColorSelection';


const Home = ({
    getUserInfoWithAccessToken,
    username,
    fetchUserEvents,
    fetchUserInTeam,
    teams,
    events,
    updateEvent,
    teamSelection,
    deleteEvents,
    createEvent,

}) => {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({ team: 'Select', user: 'Select', color: 'Turquoise'});
    const [slotInfo, setSlotInfo] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);

    // baseState = this.state; // how you reset state

    useEffect(() => {
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken).then((response) => {
                return fetchUserEvents(username);
            }).then(response => {
                console.log('response');
            }).catch(err => console.log(err));
        }
    },[ username ]);

    const resetModalForm = () => {
        const { show, selected, slotInfo, modalTitle} = initialState;
        setModalTitle(modalTitle);
        setSelected(selected);
        setSlotInfo(slotInfo);
        setShow(show);
    }

    const handleSelectEvent = (modalTitle) => (eventInfo) => {
        const {title='Select', team = 'Select', id=null, color='Turquoise'} = eventInfo;

        setShow(true);
        setSelected({ team, user: title, color, id });
        setSlotInfo(eventInfo);
        setModalTitle(modalTitle);
      }


    const handleClose = () => {
        const {id} = selected;
        resetModalForm();
        if(modalTitle === 'Edit Event') {
            let eventToBeDeleted = null;
            events.forEach((e) => {
                if(e.id === id) eventToBeDeleted = e;
            })
            deleteEvents(id, eventToBeDeleted);
        }
    }
    
    const handleSelectionChange = (event) => {
        const {name, value} = event.target;

        // only fetch from server if the teams is null, and it is a team
        if(name === 'team' && !teams[value].users) {
            fetchUserInTeam(value);
        }
        setSelected({ ...selected, [name]: value});
    }

    const handleEventPropGetter = (e) => {
        const idx = _.findIndex(colorSelection, ({name}) => e.color === name);
        const {title} = e;
        let background = null;
        Object.keys(teams).forEach(t => {
            if(t === title) {
                background = teams[t][color];
            }
        })

        console.log(e.title, teams)
        return {
            style:{
                background,
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
 
        const {start, end} = slotInfo;
        const {user,team} = selected;

        if(user === 'Select' || team === 'Select') return;

        
        resetModalForm();
        if(modalTitle === 'Edit Event') {
            updateEvent({
                title: team,
                id: _.findIndex(events.event, (e) => e.id === slotInfo.id),
                user, start, end,
            })
        } else {
            createEvent({
                title: team,
                user, start, end,
            })
        }
    }
      
    const {team, user,color} = selected;
    const {message, event=[]} = events;
        
    return (
        <>
        <Modal modalTitle={modalTitle} onHide={resetModalForm} onClose={handleClose} show={show} onSubmit={handleSubmit} >
            <DropDownButton title={color} >
                    {colorSelection.map((selection) => {
                        return <DropDown.Item key={uuid.v4()} 
                        eventKey={selection.name} 
                        onSelect={(eventKey) => setSelected({...selected, color: eventKey})/*this.setState({selected: {...selected, color: eventKey}})*/} 
                        style={{...selection.style, height:'30px'}}>{selection.name} </DropDown.Item>
                    })}
            </DropDownButton>
            <SelectInput label={'Team'} name={'team'} selections={teamSelection} handleChange={handleSelectionChange} value={team}/>
            { teams[team] && teams[team].users && 
                <SelectInput label={'User'} name={'user'} selections={teams[team].users} handleChange={handleSelectionChange} value={user} />
            }
        </Modal>
        {
            message === 'success' ? <Calendar
            style={{"cursor": "pointer",height: 700, width: '80%', margin: 'auto'}}
            selectable
            popup
            localizer={localizer}
            startAccessor='start'
            endAccessor='end'
            events={event}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent('Edit Event')}
            onSelectSlot={handleSelectEvent('Create New Event')}
            eventPropGetter={handleEventPropGetter}
            /> : <Alert variant='danger' >{message}</Alert>
        }
        </>
    )
}



moment.locale('en');
const localizer = momentLocalizer(moment);

const initialState = {
    show: false,
    selected: {
        team: 'Select',
        user: 'Select',
        color: 'Turquoise'
    },
    slotInfo: null,
    modalTitle: null,
}

const mapStateToProps = ({user, teams = {}, events}) => {
    const {role, username} = user;
    const {Admin = []} = role;
    
    console.log('teams', teams, events);
    return {
        teamSelection: Admin,
        username,
        teams,
        events,
    }
}

const mapDispatchToProps = {
    getUserInfoWithAccessToken,
    fetchUserInTeam,
    populateTeamName,
    fetchUserEvents,
    updateEvent,
    deleteEvents,
    createEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);