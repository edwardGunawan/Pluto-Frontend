import React from 'react';
import _ from 'lodash';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';

import {connect} from 'react-redux';
import {fetchUserInTeam, populateTeamName} from '../../redux/actions/teamAction';
import { fetchUserEvents, updateEvent, deleteEvents} from '../../redux/actions/eventsAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import uuid from 'uuid';
import DropDown from 'react-bootstrap/Dropdown'


import Modal from '../Common/Modal';
import SelectInput from '../Common/SelectInput';
import DropDownButton from 'react-bootstrap/DropdownButton';
import colorSelection from '../util/ColorSelection';

moment.locale('en');
const localizer = momentLocalizer(moment);

class Home extends React.Component {
    state = {
        view: 'day',
        show: false,
        selected: {
            team: 'Select',
            user: 'Select',
            color: 'Turquoise'
        },
        slotInfo: null,
        modalTitle: null,
    }

    baseState = this.state;

    componentDidMount() {
        const { getUserInfoWithAccessToken, username } = this.props;
        console.log('username', username);
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken);
        }
        if(username) {
            console.log('this gets emitted again');
            debugger;
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.username !== this.props.username) {
            const {populateTeamName, username, fetchUserEvents} = this.props;
            const {teamSelection} = nextProps;
            populateTeamName(teamSelection);
            fetchUserEvents(username);
        }
    }

    resetModalForm = () => {
        const {events} = this.state;
        this.setState({...this.baseState, events});
    }

    handleSelectEvent = (modalTitle) => (eventInfo) => {
        const {title='Select', team='Select', id=null, color='Turquoise'} = eventInfo;
        this.setState({
            show: true,
            selected: { team, user: title, color, id },
            slotInfo: eventInfo,
            modalTitle,
        });
      }


    handleClose = () => {
        const {modalTitle ,selected} = this.state;
        const {id} = selected;
        this.resetModalForm();

        if(modalTitle === 'Edit Event') {
            const {deleteEvents, events} = this.props;
            let eventToBeDeleted = null;
            events.forEach((e) => {
                if(e.id === id) eventToBeDeleted = e;
            })
            deleteEvents(id, eventToBeDeleted);
        }
    }
    
    handleSelectionChange = (event) => {
        const {name, value} = event.target;
        const { fetchUserInTeam, teams } = this.props;
        // console.log(name, value);
        // console.log('teams in handleselection change', teams);
        // console.log(teams[value]);
        // only fetch from server if the teams is null, and it is a team
        if(name === 'team' && !teams[value].users) fetchUserInTeam(value);
        const selected = {
            ...this.state.selected,
            [name]: value,
        }
        
        this.setState({selected});
    }

    handleEventPropGetter = (e) => {
        console.log(e);
        const idx = _.findIndex(colorSelection, ({name}) => e.color === name);
        const {backgroundColor} = colorSelection[idx].style;
        return {
            style:{
                background: backgroundColor,
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();  
        const {slotInfo, selected} = this.state;
        const { events, updateEvent } = this.props;
        const {start, end} = slotInfo;
        const {user,team, color} = selected;
        console.log(color);

        if(user === 'Select' || team === 'Select') return;
        
        // console.log('slot info', slotInfo);
        // check if eventInfo exist
        const index = _.findIndex(events, (e) => e.id === slotInfo.id);
        
        this.resetModalForm();
        updateEvent({
            title: user,
            id: index > -1 ? events[index].id: uuid.v4(),
            team, color, start, end,
        })
    }
      

    render () {
        const {show, selected, modalTitle} = this.state;
        const {team, user,color} = selected;
        const {events,teamSelection, teams} = this.props;

        
        return (
            <>
            <Modal modalTitle={modalTitle} onClose={this.handleClose} show={show} onSubmit={this.handleSubmit} >
                <DropDownButton title={color} >
                        {colorSelection.map((selection) => {
                            return <DropDown.Item key={uuid.v4()} 
                            eventKey={selection.name} 
                            onSelect={(eventKey) => this.setState({selected: {...this.state.selected, color: eventKey}})} 
                            style={{...selection.style, height:'30px'}}>{selection.name} </DropDown.Item>
                        })}
                </DropDownButton>
                <SelectInput label={'Team'} name={'team'} selections={teamSelection} handleChange={this.handleSelectionChange} value={team}/>
                { teams[team] && teams[team].users && 
                    <SelectInput label={'User'} name={'user'} selections={teams[team].users} handleChange={this.handleSelectionChange} value={user} />
                }
            </Modal>

            <Calendar
                style={{"cursor": "pointer",height: 700, width: '80%', margin: 'auto'}}
                selectable
                popup
                localizer={localizer}
                startAccessor='start'
                endAccessor='end'
                events={events}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                defaultView={Views.MONTH}
                onSelectEvent={this.handleSelectEvent('Edit Event')}
                onSelectSlot={this.handleSelectEvent('Create New Event')}
                eventPropGetter={this.handleEventPropGetter}
                />
            </>
        )
    }
}

const mapStateToProps = ({user, teams = {}, events}) => {
    const {role, username} = user;
    const {Admin = []} = role;

    return {
        teamSelection: Admin,
        username,
        teams,
        events: (_.isEmpty(events))? [] : Object.values(events.event),
    }
}

const mapDispatchToProps = {
    getUserInfoWithAccessToken,
    fetchUserInTeam,
    populateTeamName,
    fetchUserEvents,
    updateEvent,
    deleteEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);