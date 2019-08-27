import initialState from '../initialState';
import {INSERT_TEAM_INFO, SUBMIT_REGISTRATION_REQUEST, REGISTER_FAILED, REGISTER_SUCCESS} from '../actions/registerAction';

export default function registerReducer(state = initialState.register,  action) {
    console.log(action.type);
    switch(action.type) {
        case INSERT_TEAM_INFO:
            return Object.assign({}, state, {
                teams: action.payload,
            });
        case SUBMIT_REGISTRATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching:false,
                message: 'success',
            }
        case REGISTER_FAILED:
            console.log('register failed here');
            return {
                ...state,
                isFetching: false,
                message: action.message,
            }
        default:
            return state;
    }
}