import React, {useState, useEffect} from 'react';
import _ from 'lodash';



import {connect} from 'react-redux';
import { fetchTeamBasedOnUser } from '../../redux/actions/teamAction';
import { fetchUserEvents, updateEvent, deleteEvents, createEvent, fetchUserEventsBasedOnTeamId} from '../../redux/actions/eventsAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import uuid from 'uuid';

import Modal from '../Common/Modal';

// import DropDown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert';
import SelectInput from '../Common/SelectInput';
import DropDownComponent from './DropDownComponent';
import CalendarComponent from './CalendarComponent';
// import DropDownButton from 'react-bootstrap/DropdownButton';
// import colorSelection from '../util/ColorSelection';


const Home = ({
    // fetchUserInTeam,
    // action creator
    getUserInfoWithAccessToken,
    fetchUserEventsBasedOnTeamId,
    fetchTeamBasedOnUser,
    updateEvent,
    deleteEvents,
    createEvent,

    // state 
    teams,
    events,
    username,

}) => {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({ team: 'Select', user: 'Select'});
    const [slotInfo, setSlotInfo] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [eventKey, setEventKey] = useState("Select");

    // baseState = this.state; // how you reset state

    useEffect(() => {
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken)
            .then((user) => {
                console.log('about to fetchTeamBasedOnUser ', user);
                return fetchTeamBasedOnUser(user.id);
            }).catch(err => console.error(err));
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
        console.log(eventInfo, modalTitle);
        const {title='Select', team = 'Select', id=null} = eventInfo;
        console.log(title, user, id);
        setShow(true);
        setSelected({ team, user: title, id });
        setSlotInfo(eventInfo);
        setModalTitle(modalTitle);
      }


    const handleClose = () => {
        const {id} = selected;
        resetModalForm();
        if(modalTitle === 'Edit Event') {
            let eventToBeDeleted = null;
            events.event.forEach((e) => {
                if(e.id === id) eventToBeDeleted = e;
            })
            deleteEvents(id);
        }
    }
    
    const handleSelectionChange = (event) => {
        const {name, value} = event.target;
        setSelected({ ...selected, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
 
        const {start, end, id} = slotInfo;
        const {user} = selected;

        if(user === 'Select') return;

        
        resetModalForm();
        if(modalTitle === 'Edit Event') {
            updateEvent({
                team: eventKey,
                id,
                user, start, end,
            })
        } else {
            createEvent({
                team: eventKey,
                user, start, end,
            })
        }
    }

    // Select drop down for teams
    const handleSelectDropDown = (e) => {
        setEventKey(e);

        let selectedTeam = null;
        teams.team.forEach(t => {
            if(t.name === e) { 
                selectedTeam = t;
            }
        });

        fetchUserEventsBasedOnTeamId(selectedTeam.id)
        .catch(e => console.error(e));
    }

    // isAdmin check if the team that is selected if the current user
    // is an admin, if the current user is not an admin set
    // selectable on the calendar to not able to edit or delete
    const isAdmin = () => {
        const currentTeam = teams.team
        .reduce((acc, currObj) => {
            if(currObj.name === eventKey) return currObj;
            return acc;
        },null);

        return currentTeam.admins
        .reduce((acc, currObj) => {
            if(currObj.username === username) return true;
            return acc;
        } , false);
    }

    // const getTeamSelection = () => {
    //    return !(_.isEmpty(teams)) ? teams.team.filter(t => {
    //         return t.admins.reduce((acc,currUser) => {
    //             if(currUser.username === username) return true;
    //             return acc;
    //         }, false);
    //     }).map(t => t.name) : [];
    // }

    const getUserSelectionInTeam = () => {
        // TODO: filter selection slot that already occupy with the user
        // const {team} = selected;
        const val = !(_.isEmpty(teams)) ? teams.team
        .reduce((acc,t) => {
            if(t.name === eventKey) return t.users;
            return acc;
        },[])
        .map(u => u.username) : [];

        console.log(val);
        return val;
    }
      
    const {team, user } = selected;
    const {message, event=[]} = events;
    
        
    return (
        <>
        <DropDownComponent teams ={teams.team} eventKey={eventKey} handleSelect={handleSelectDropDown}/>

        <Modal modalTitle={modalTitle} onHide={resetModalForm} onClose={handleClose} show={show} onSubmit={handleSubmit} >
                {/* <SelectInput label={'Team'} name={'team'} selections={getTeamSelection()} handleChange={handleSelectionChange} value={team}/>  */}
                <SelectInput label={'User'} name={'user'} selections={getUserSelectionInTeam()} handleChange={handleSelectionChange} value={user} />
        </Modal>

        { eventKey !== 'Select' &&
            <CalendarComponent handleSelectEvent={handleSelectEvent} message={message} event={event} selectable={isAdmin()} />
        }
        </>
    )
}





const initialState = {
    show: false,
    selected: {
        team: 'Select',
        user: 'Select',
    },
    slotInfo: null,
    modalTitle: null,
}

const mapStateToProps = ({user={}, teams = {}, events}) => {
    const {username} = user;
    // each selection will have a message in it, so it will be an object
    console.log('teams', teams, events, user);
    if(!_.isEmpty(events)) console.log(events.event.length);
    return {
        username,
        teams,
        events,
    }
}

const mapDispatchToProps = {
    getUserInfoWithAccessToken,
    fetchUserEventsBasedOnTeamId,
    fetchTeamBasedOnUser,
    updateEvent,
    deleteEvents,
    createEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);