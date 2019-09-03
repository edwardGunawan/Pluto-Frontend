import React from 'react';
import _ from 'lodash';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';
import events from './events';
import {connect} from 'react-redux';
import {fetchUserInTeam, populateTeamName} from '../../redux/actions/teamAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import uuid from 'uuid';


import Modal from '../Common/Modal';
import SelectInput from '../Common/SelectInput';

moment.locale('en');
const localizer = momentLocalizer(moment);

class Home extends React.Component {
    state = {
        view: 'day',
        events: [...events],
        show: false,
        selected: {
            team: 'Select',
            user: 'Select',
        },
        slotInfo: null,
        modalTitle: null,
        onEdit: false,
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
            const {populateTeamName} = this.props;
            const {teamSelection} = nextProps;
            populateTeamName(teamSelection);
        }
    }

    resetModalForm = () => {
        const {events} = this.state;
        this.setState({...this.baseState, events});
    }

    handleSelectEvent = (eventInfo) => {
        console.log(eventInfo);
        const {title, team, id} = eventInfo;
        this.setState({
            show: true,
            selected: {
                team,
                user: title,
                id,
            },
            slotInfo: eventInfo,
            modalTitle: 'Edit Event',
        });
      }
    
    handleSlot = (slotInfo) => {
        this.setState({show:true, slotInfo, modalTitle:'Create New Event'});
    }

    handleClose = () => {
        const {modalTitle, events ,selected} = this.state;
        const {id} = selected;
        this.resetModalForm();

        if(modalTitle === 'Edit Event') {
            console.log('going through modalTitle', modalTitle)
            this.setState({
                events : events.filter((e) => e.id !== id),
            });    
        }
            

        
    }
    
    handleSelectionChange = (event) => {
        const {name, value} = event.target;
        const { fetchUserInTeam, teams } = this.props;
        // console.log(name, value);
        // console.log('teams in handleselection change', teams);
        console.log(teams[value]);
        // only fetch from server if the teams is null, and it is a team
        if(name === 'team' && !teams[value].users) fetchUserInTeam(value);
        const selected = {
            ...this.state.selected,
            [name]: value,
        }
        
        this.setState({selected});
    }



    handleSubmit = (event) => {
        event.preventDefault();
        
        const {events,slotInfo, selected} = this.state;
        const {start, end} = slotInfo;
        const {user,team} = selected;

        if(user === 'Select' || team === 'Select') return;
        
        
        // check if eventInfo exist
        const index = _.findIndex(events, (e) => e.id === slotInfo.id);


        let newEvents =[...events]

        
        this.resetModalForm();

        if( index === -1) {
            newEvents.push({
                title: user,
                id: uuid.v4(),
                team,
                start,
                end,
            });
        }

        newEvents[index] = {
            ...slotInfo,
            title: user,
            team, 
        }

        this.setState({
            events: newEvents
        });
    }
      

    render () {
        const {events, show, selected, modalTitle} = this.state;
        const {team, user} = selected;
        const {teamSelection, teams} = this.props;
        
        
        return (
            <>
            <Modal modalTitle={modalTitle} onClose={this.handleClose} show={show} onSubmit={this.handleSubmit} >
                <SelectInput label={'Team'} name={'team'} selections={teamSelection} handleChange={this.handleSelectionChange} value={team} />
                { teams[team] && teams[team].users && <SelectInput label={'User'} name={'user'} selections={teams[team].users} handleChange={this.handleSelectionChange} value={user}/> }
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
                onSelectEvent={this.handleSelectEvent}
                onSelectSlot={this.handleSlot}
                eventPropGetter={(e,start,end,isSelected) => {
                    // console.log('entering eventPropGetter')
                    // console.log(e);
                    // console.log(start, end);
                    // console.log(isSelected);
                    return {
                        style:{
                            background: 'green',
                        }
                    }
                }}
                />
            </>
        )
    }
}

const mapStateToProps = ({user, teams = {}}) => {
    const {role, username} = user;
    console.log('teams in mapstateToprops', teams);
    console.log(user, teams);
    const {Admin = {}} = role;
    
    // if (!isAuthenticated) history.push('/');
    return {
        teamSelection: Admin,
        username,
        teams,
    }
}

const mapDispatchToProps = {
    getUserInfoWithAccessToken,
    fetchUserInTeam,
    populateTeamName
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);