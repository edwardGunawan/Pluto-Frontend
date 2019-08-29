import React from 'react';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';
import events from './events';
import {connect} from 'react-redux';
import {fetchUserInTeam} from '../../redux/actions/teamAction';
import { getUserInfoWithAccessToken } from '../../redux/actions/authenticationAction';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Modal from './Modal';
import SelectInput from './SelectInput';

moment.locale('en');
const localizer = momentLocalizer(moment);

class Home extends React.Component {
    state = {
        view: 'day',
        events: [...events],
        show: false,
    }

    componentDidMount() {
        const { getUserInfoWithAccessToken, username } = this.props;
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken);
        }


    }

    handleSelect = (selectInfo) => {
        console.log(selectInfo);
        // const title = window.prompt('New Event name')
        // if (title)
        //   this.setState({
        //     events: [
        //       ...this.state.events,
        //       {
        //         start,
        //         end,
        //         title,
        //       },
        //     ],
        //   })
      }
    
    handleSlot = (slotInfo) => {
        console.log(slotInfo);
        this.handleShow();
    }

    handleClose = (e) => {
        console.log(e);
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show:true});
    }
    
    handleSelectionChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
        
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose();
    }
      

    render () {
        const {events, show, Team='Select'} = this.state;
        const {teamSelection} = this.props;
        return (
            <div style={{height: 700, width: 900, margin: 'auto'}}>
                <Modal onClose={this.handleClose} show={show} onSubmit={this.handleSubmit}>
                    <SelectInput label={'Team'} selections={teamSelection} handleChange={this.handleSelectionChange} value={Team} />
                </Modal>
                    
                <Calendar
                    style={{"cursor": "pointer"}}
                    selectable
                    popup
                    localizer={localizer}
                    startAccessor='start'
                    endAccessor='end'
                    events={events}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    defaultView={Views.MONTH}
                    onSelectEvent={(e) => console.log('selecting events', e)}
                    onSelectSlot={this.handleSlot}
                    />
            </div>
        )
    }
}

const mapStateToProps = ({user, teams = null}, {history}) => {
    const {isAuthenticated, role, username} = user;
    const {Admin = null} = role;
    if (!isAuthenticated) history.push('/');
    return {
        teamSelection: Admin,
        username,
        teams,
    }
}

const mapDispatchToProps = {
    getUserInfoWithAccessToken,
    fetchUserInTeam,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);