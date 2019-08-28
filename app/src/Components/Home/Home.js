import React from 'react';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { arrayExpression } from '@babel/types';

moment.locale('en');
const localizer = momentLocalizer(moment);

let allViews = Object.keys(Views).map(k => Views[k]);

class Home extends React.Component {
    state = {
        view: 'day',
        events: [...events],
        show: false,
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
          this.setState({
            events: [
              ...this.state.events,
              {
                start,
                end,
                title,
              },
            ],
          })
      }

    handleClose = (e) => {
        console.log(e);
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show:true});
    }
    
      

    render () {
        const {events, show} = this.state;
        return (
            <div style={{height: 700}}>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Events</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSelect}>
                            <Form.Group>
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Meeting" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select">
                                    <option>Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            <Calendar
                    style={{"cursor": "pointer"}}
                    selectable
                    localizer={localizer}
                    startAccessor='start'
                    endAccessor='end'
                    events={events}
                    views={allViews}
                    defaultView={Views.MONTHS}
                    onSelectEvent={(e) => console.log('selecting events', e)}
                    onSelectSlot={this.handleShow}
                    />
            </div>
        )
    }
}


export default Home;