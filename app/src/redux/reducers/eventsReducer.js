import { FETCH_EVENTS_SUCCESS, 
        FETCH_EVENTS_ERROR, 
        CREATE_EVENTS_ERROR,
        CREATE_EVENTS_SUCCESS, 
        UPDATE_EVENTS_ERROR, 
        UPDATE_EVENTS_SUCCESS,
        CREATE_EVENTS,
        UPDATE_EVENTS } from '../actions/eventsAction';
import initialState from '../initialState';

export default function eventsReducer(state=initialState.events, action) {
    switch(action.type) {
        case FETCH_EVENTS_SUCCESS:
            return {
                message: 'success',
                event: action.events,
            }
        case UPDATE_EVENTS_SUCCESS:   
        const {event} = action;
            return {
                event: {
                    ...state.event,
                    [event.id]: event,
                },
                message: 'success',
            }
        // case CREATE_EVENTS:
        // case UPDATE_EVENTS:
        //     const {id} = event;
        //     return {
        //         ...state,
        //         event: {
        //             ...state.event,
        //             [id] : event,
        //         }
        //     }
        case FETCH_EVENTS_ERROR:
        case UPDATE_EVENTS_ERROR:
        case CREATE_EVENTS_ERROR:
            const {message} = action;
            return {
                ...state,
                message,
            }
        default:
            return state;

    }
}