
import {ofType} from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';

const FETCH_USER_EVENTS = 'FETCH_USER_EVENTS';
export const CREATE_EVENTS = 'CREATE_EVENTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const CREATE_EVENTS_SUCCESS = 'CREATE_EVENTS_SUCCESS';
export const CREATE_EVENTS_ERROR = 'CREATE_EVENTS_ERROR';
export const UPDATE_EVENTS_SUCCESS = 'UPDATE_EVENTS_SUCCESS';
export const UPDATE_EVENTS_ERROR = 'UPDATE_EVENTS_ERROR';


export const fetchUserEvents = (username) => ({type: FETCH_USER_EVENTS, username});
const fetchEventsSuccess = (response) => ({type: FETCH_EVENTS_SUCCESS, events: response});
const fetchEventsError = (message) => ({type: FETCH_EVENTS_ERROR, message});

// export const createEvent = (event, username) => ({type : CREATE_EVENTS, event, username});
// const createEventSuccess = () => ({type: CREATE_EVENTS_SUCCESS});
// const createEventError = (message) => ({type: CREATE_EVENTS_ERROR, message});


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
            console.log(events.event[id]);
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
                    const requestBody = JSON.parse(e.request.body);
                    const {id} = requestBody;
                    const {event} = state$.value.events;
                    // const body = Object.keys(event).reduce((acc,key) => {
                    //     if(key !== id) {
                    //         return {...acc, [key] : event[key]};
                    //     }
                    //     return acc;
                    // }, {})
                        return of(updateEventError(e.message));
                })
            )
        })
    )
}
