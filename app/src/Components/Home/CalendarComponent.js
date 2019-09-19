import React from 'react';
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment';

import Alert from 'react-bootstrap/Alert';

moment.locale('en');
const localizer = momentLocalizer(moment);
const CalendarComponent = ({
    message,
    event,
    handleSelectEvent,
    selectable,
}) => {
    const isPointer = selectable ? "pointer" : "auto";
    return (
        <>
            {
                message === 'success' ? 
                <Calendar
                    style={{"cursor": isPointer,height: 700, width: '80%', margin: 'auto'}}
                    selectable={selectable}
                    popup
                    localizer={localizer}
                    startAccessor='start'
                    endAccessor='end'
                    events={event}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    defaultView={Views.MONTH}
                    onSelectEvent={selectable && handleSelectEvent('Edit Event')}
                    onSelectSlot={handleSelectEvent('Create New Event')}
                    /> : <Alert variant='danger' >{message}</Alert>
            }
        </>    
    )
}

export default CalendarComponent;