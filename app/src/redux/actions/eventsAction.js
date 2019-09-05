
import {ofType} from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';

const FETCH_USER_EVENTS = 'FETCH_USER_EVENTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const DELETE_EVENTS = 'DELETE_EVENTS';


export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const UPDATE_EVENTS_SUCCESS = 'UPDATE_EVENTS_SUCCESS';
export const UPDATE_EVENTS_ERROR = 'UPDATE_EVENTS_ERROR';
export const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
export const DELETE_EVENTS_ERROR = 'DELETE_EVENTS_ERROR';

/**
 * GET events
 *  */ 
export const fetchUserEvents = (username) => ({type: FETCH_USER_EVENTS, username});
const fetchEventsSuccess = (response) => ({type: FETCH_EVENTS_SUCCESS, events: response});
const fetchEventsError = (message) => ({type: FETCH_EVENTS_ERROR, message});

/**
 * 
 * DELETE events
 */
export const deleteEvents = (id, eventToBeDeleted) => ({type: DELETE_EVENTS, id, eventToBeDeleted});
const deleteEventSuccess = () => ({type: DELETE_EVENTS_SUCCESS});
const deleteEventError = (message, originalValue) => ({type: DELETE_EVENTS_ERROR, message, originalValue});


/**
 * 
 * POST, PUT events
 */
export const updateEvent = (event) => ({type: UPDATE_EVENTS, event});
const updateEventSuccess = (newEvent) => ({type: UPDATE_EVENTS_SUCCESS, event: newEvent});
const updateEventError = (message) => ({type: UPDATE_EVENTS_ERROR, message});

// GET
export const fetchEventsEpic = (action$) => {
    return action$.pipe(
        ofType(FETCH_USER_EVENTS),
        tap((action) => console.log(action)),
        mergeMap(({username}) => {
            return ajax.getJSON(`http://localhost:3001/events/${username}`).pipe(
                tap(response => console.log('response in fetchEvents Epic', response)),
                map(res => fetchEventsSuccess(res)),
                catchError((e) => {
                    console.error(e);
                    return of(fetchEventsError(e.message))
                })
            )
        })
    )
}


// PUT
// here you can grab state in the store
export const updateEventsEpic = (action$, state$) => {
    console.log('what is the state in updateEvents Epic', state$);

    return action$.pipe(
        ofType(UPDATE_EVENTS),
        tap(({event}) => {
            const {user, events} = state$.value;
            const {username} = user;
            const {id} = event;
            console.log(id);
            console.log('here in udpateEventsEpic', events.event[id], username);
        }),
        mergeMap(({event}) => {
            const {user, events} = state$.value;
            const {username} = user;
            const {id} = event;

            const url = events.event[id] ? `http://localhost:3001/events/${username}/${id}`:`http://localhost:3001/events/${username}`; 
            const method=  events.event[id] ? 'PUT' : 'POST';
            return ajax({
                url,
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    ...event,
                }
            }).pipe(
                tap(res => console.log('response from udpateEvents Epic', res)),
                map(res => JSON.parse(res.request.body)),
                map((res) => updateEventSuccess(res)),
                catchError(e => {
                    console.error(e);
                    return of(updateEventError(e.message));
                })
            )
        })
    )
}

// DELETE
export const deleteEventsEpic = (action$, state$) => {
    return action$.pipe(
        ofType(DELETE_EVENTS),
        tap(action => console.log('in delete events', action)),
        
        mergeMap(({id, eventToBeDeleted}) => {
            const {user} = state$.value;
            const {username} = user;
            return ajax({
                url: `http://localhost:3001/events/${username}/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).pipe(
                tap((res) => console.log('response from delete Events epic', res)),
                map(() => deleteEventSuccess()),
                catchError(e => {
                    console.error(e);
                    console.log(eventToBeDeleted);
                    return of(deleteEventError(e.message, eventToBeDeleted));
                })
            )
        })
    )
}


// POST (Create)
// export const createEventsEpic = action$ => {
//     return action$.pipe(
//         ofType(CREATE_EVENTS),
//         tap((action) => console.log(action)),
//         mergeMap(({event, username}) => {
//             return ajax({
//                 url: `http://localhost:3001/events/${username}`,
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: {
//                     ...event,
//                 }
//             }).pipe(
//                 tap(res => console.log('response in createEventEpic')),
//                 map(res => createEventSuccess()),
//                 catchError(({message}) => {
//                     console.error(message);
//                     return of(createEventError(message))
//                 })
//             )
//         })
//     )
// }