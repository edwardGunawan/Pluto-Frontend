import { FETCH_EVENTS_SUCCESS, 
        FETCH_EVENTS_ERROR, 
        UPDATE_EVENTS_ERROR, 
        UPDATE_EVENTS_SUCCESS,
        DELETE_EVENTS,
        DELETE_EVENTS_SUCCESS,
        DELETE_EVENTS_ERROR
        } from '../actions/eventsAction';
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
        case DELETE_EVENTS:
            const {id} = action;
            return {
                ...state,
                event: Object.keys(state.event).reduce((acc,eventId) => {
                    if(eventId === id) {
                        return acc;
                    }
                    return Object.assign({}, acc,{[eventId]: state.event[eventId]});;
                },
                {}),
            }
        case DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                message: 'Success',
            }
        case FETCH_EVENTS_ERROR:
        case UPDATE_EVENTS_ERROR:
            const {message} = action;
            return {
                ...state,
                message,
            }
        case DELETE_EVENTS_ERROR:
            const {originalValue} = action;
            return {
                message: action.message,
                event: {
                    ...state.event,
                    [originalValue.id]: originalValue,
                }
            }
        default:
            return state;

    }
}