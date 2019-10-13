import { FETCH_EVENTS_SUCCESS, 
        FETCH_EVENTS_ERROR, 
        UPDATE_EVENTS_ERROR, 
        UPDATE_EVENTS_SUCCESS,
        CREATE_EVENTS_SUCCESS,
        CREATE_EVENTS_ERROR,
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
            return {
                event: state.event.map(e => {
                    if(e.id === action.event.id) {
                        console.log('when ', e.id, ' equal to ', action.event);
                        return action.event;
                    } else {
                        return e;
                    }
                }),
                message: 'success',
            }
        case CREATE_EVENTS_SUCCESS:   
        const {event} = action;
            return {
                event: state.event.concat(event),
                message: 'success',
            }
        case DELETE_EVENTS_SUCCESS:
            const {id} = action;
            return {
                ...state,
                message: 'success',
                event: state.event.filter(e => e.id !== id),
            }
        case FETCH_EVENTS_ERROR:
        case UPDATE_EVENTS_ERROR:
        case CREATE_EVENTS_ERROR:
            const {message} = action;
            return {
                ...state,
                message,
            }
        case DELETE_EVENTS_ERROR:
            // const {originalValue} = action;
            return {
                message: action.message,
                event: {
                    ...state.event,
                }
            }
        default:
            return state;

    }
}