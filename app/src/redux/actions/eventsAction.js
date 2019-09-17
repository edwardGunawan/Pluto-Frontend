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
export const fetchUserEvents = (username) => {
    return async dispatch => {
        try{
            const response = await fetch(`http://localhost:8080/events/${username}`);
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

const parseEvent = (evt) => evt.map(e => {
    return {
        title: e.teamName,
        username: e.username,
        id: e.id,
        allDay: e.allDay,
        start: new Date(e.start),
        end: new Date(e.end),
    }
})
    

const fetchEventsSuccess = (response) => ({type: FETCH_EVENTS_SUCCESS, events: response});
const fetchEventsError = (message) => ({type: FETCH_EVENTS_ERROR, message});

/**
 * 
 * DELETE events
 */
export const deleteEvents = (id, eventToBeDeleted) => {
    return async (dispatch, getState) => {
        try {
            const {username}= getState().user;
            await fetch(`http://localhost:8080/events/${username}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(deleteEventSuccess(id));
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
            const {user} = getState();
            const {id} = event;
            const url = `http://localhost:8080/events/${id}`;
            const method=  'PUT';
            console.log(method);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'currentUserId': user.id,
                },
                body: {
                    ...event,
                }
            });
            const json = await response.json();
            dispatch(updateEventSuccess(json));

        }catch (e) {
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
            const url = `http://localhost:8080/api/v1/events`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'currentUserId': getState().id,
                },
                body: {
                    ...event,
                }
            });
            const json = await response.json();
            dispatch(createEventSuccess(json));
        } catch(e) {
            dispatch(createEventError(e.message));
        }
    }
}

const createEventSuccess = (newEvent) => ({type: CREATE_EVENTS_SUCCESS, event: newEvent});
const createEventError = (message) => ({type: CREATE_EVENTS_ERROR, message});