import moment from 'moment';

export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const DELETE_EVENTS = 'DELETE_EVENTS';


export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const UPDATE_EVENTS_SUCCESS = 'UPDATE_EVENTS_SUCCESS';
export const UPDATE_EVENTS_ERROR = 'UPDATE_EVENTS_ERROR';
export const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
export const DELETE_EVENTS_ERROR = 'DELETE_EVENTS_ERROR';
export const CREATE_EVENTS_SUCCESS = 'CREATE_EVENTS_SUCCESS';
export const CREATE_EVENTS_ERROR = 'CREATE_EVENTS_ERROR';



/**
 * GET events
 *  */ 
export const fetchUserEventsBasedOnTeamId = (teamId) => {
    return async dispatch => {
        try{
            const response = await fetch(`http://localhost:8080/api/v1/events?teamId=${teamId}`);
            const json = await response.json();
            console.log(json);
            const {events} = json;
            dispatch(fetchEventsSuccess(parseEvent(events)))
        } catch(e) {
            console.error(e);
            dispatch(fetchEventsError(e.message));

        }
    }
};


    

const fetchEventsSuccess = (response) => ({type: FETCH_EVENTS_SUCCESS, events: response});
const fetchEventsError = (message) => ({type: FETCH_EVENTS_ERROR, message});

/**
 * 
 * DELETE events
 */
export const deleteEvents = (eventId) => {
    return async (dispatch, getState) => {
        try {
            const {id}= getState().user;
            await fetch(`http://localhost:8080/api/v1/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'currentUserId': id,
                }
            });
            console.log(eventId);
            dispatch(deleteEventSuccess(eventId));
        } catch (e) {
            dispatch(deleteEventError(e.message));
        }
    }
}
const deleteEventSuccess = (id) => ({type: DELETE_EVENTS_SUCCESS, id});
const deleteEventError = (message, originalValue) => ({type: DELETE_EVENTS_ERROR, message, originalValue});


/**
 * 
 * PUT events
 */
export const updateEvent = (event) => {
    return async (dispatch,getState) => {
        try {
            const {id} = getState().user;
            const url = `http://localhost:8080/api/v1/events/${event.id}`;
            console.log(event.id);
            const eventResponse = parseEventResponse(event)
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'currentUserId': id,
                },
                body: JSON.stringify(eventResponse),
            });
            const singleEvent = await response.json();
            // console.log(singleEvent);
            dispatch(updateEventSuccess(parseSingelEvent(singleEvent)));
        }catch (e) {
            console.error(e);
            dispatch(updateEventError(e.message));
        }
    }
};
const updateEventSuccess = (newEvent) => ({type: UPDATE_EVENTS_SUCCESS, event: newEvent});
const updateEventError = (message) => ({type: UPDATE_EVENTS_ERROR, message});

/**
 * 
 * POST (Create) event
 */
export const createEvent = (event) => {
    return async (dispatch, getState) => {
        
        try {
            console.log('event here ', parseEventResponse(event));
            const eventResponse = parseEventResponse(event)
            // console.log(...eventResponse)
            const url = `http://localhost:8080/api/v1/events`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'currentUserId': getState().user.id,
                },
                body: JSON.stringify(eventResponse),
            });
            const singleEvent = await response.json();
            console.log('singleEvent', singleEvent);
            dispatch(createEventSuccess(parseSingelEvent(singleEvent)));
        } catch(e) {
            console.error(e);
            dispatch(createEventError(e.message));
        }
    }
}

const createEventSuccess = (newEvent) => ({type: CREATE_EVENTS_SUCCESS, event: newEvent});
const createEventError = (message) => ({type: CREATE_EVENTS_ERROR, message});


/*
    Helper Method
*/

function parseSingelEvent(e){
    console.log(new Date(e.start), new Date(e.end));
    return {
        team: e.teamName,
        title: e.username,
        id: e.id,
        allDay: e.allDay,
        start: moment(e.start),
        end: moment(e.end),
    }
}

function parseEvent(evt){
    return evt.map(e => {
        return parseSingelEvent(e);
    });
}

function parseEventResponse(e) {
    return {
        teamName: e.team,
        username: e.user,
        id: e.id,
        allDay: true,
        start: e.start.toISOString().substring(0,10),
        end: e.end.toISOString().substring(0,10),
    }
}
    
