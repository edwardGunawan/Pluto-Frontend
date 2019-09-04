import React from 'react';
import _ from 'lodash';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';
// import events from '../../../tools/events';
import {connect} from 'react-redux';
import {fetchUserInTeam, populateTeamName} from '../../redux/actions/teamAction';
import { fetchUserEvents, updateEvent} from '../../redux/actions/eventsAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import uuid from 'uuid';
import DropDown from 'react-bootstrap/Dropdown'


import Modal from '../Common/Modal';
import SelectInput from '../Common/SelectInput';
import DropDownButton from 'react-bootstrap/DropdownButton';

moment.locale('en');
const localizer = momentLocalizer(moment);

class Home extends React.Component {
    state = {
        view: 'day',
        events: [],
        show: false,
        selected: {
            team: 'Select',
            user: 'Select',
            color: 'Turquoise'
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

    handleSelectEvent = (eventInfo) => {
        console.log(eventInfo);
        const {title, team, id, color} = eventInfo;
        this.setState({
            show: true,
            selected: {
                team,
                user: title,
                color,
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
        console.log(name, value);
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
        
        const {slotInfo, selected} = this.state;
        const { events, updateEvent, username } = this.props;
        const {start, end, id} = slotInfo;
        const {user,team, color} = selected;
        console.log(color);


        if(user === 'Select' || team === 'Select') return;
        
        console.log(slotInfo);
        // check if eventInfo exist
        // const index = _.findIndex(events, (e) => {
        //     console.log(e.id);
        //     return e.id === slotInfo.id
        // });


        // let newEvents =[...events]

        
        this.resetModalForm();

        console.log('index in home.js for submit button', id);
        updateEvent({
            title: user,
            id: events.hasOwnProperty(id) ? uuid.v4() : id,
            team,
            color,
            start,
            end,
        })
        // if( index === -1) {
            
            // newEvents.push({
            //     title: user,
            //     id: uuid.v4(),
            //     team,
            //     color,
            //     start,
            //     end,
            // });
        // } 

        // newEvents[index] = {
        //     ...slotInfo,
        //     title: user,
        //     team,
        //     color, 
        // }
        

        // this.setState({
        //     events: newEvents
        // });
    }
      

    render () {
        const {show, selected, modalTitle} = this.state;
        const {team, user,color} = selected;
        const {events,teamSelection, teams} = this.props;
        console.log(teamSelection, ' selected ', selected);

        const colorSelection = [
            {
                style: {backgroundColor: '#1abc9c'}, 
                name: 'Turquoise'
            },
            {
                style: {backgroundColor: '#8e44ad'},
                name: 'Wisteria',
            }, 
            {
                style: {backgroundColor: '#d35400'},
                name: 'Pumpkin',
            }, 
            {
                style:{backgroundColor: '#f1c40f'},
                name: 'Sun Flower',
            },
            {
                style:{backgroundColor: '#c0392b'},
                name: 'Pomegranate',
            },
            {
                style:{backgroundColor: '#7f8c8d'},
                name: 'Midnight Blue',
            },
            {
                style:{backgroundColor: '#f39c12'},
                name: 'Orange',
            },
            {
                style:{backgroundColor: '#95a5a6'},
                name: 'Concrete'
            }
             
            
            
            
        ];
        
        
        return (
            <>
            <Modal modalTitle={modalTitle} onClose={this.handleClose} show={show} onSubmit={this.handleSubmit} >
                <DropDownButton title={color} >
                        {colorSelection.map((selection) => {
                            return <DropDown.Item key={uuid.v4()} eventKey={selection.name} onSelect={(eventKey) => this.setState({selected: {...this.state.selected, color: eventKey}})} style={{...selection.style, height:'30px'}}>{selection.name}</DropDown.Item>
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
                onSelectEvent={this.handleSelectEvent}
                onSelectSlot={this.handleSlot}
                eventPropGetter={(e) => {
                    const idx = _.findIndex(colorSelection, ({name}) => e.color === name);
                    const {backgroundColor} = colorSelection[idx].style;
                    return {
                        style:{
                            background: backgroundColor,
                        }
                    }
                }}
                />
            </>
        )
    }
}

const mapStateToProps = ({user, teams = {}, events}) => {
    const {role, username} = user;
    console.log('teams in mapstateToprops', teams);
    
    console.log(user, teams, 'events ', events);
    
    
    console.log(_.isEmpty(events));
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);