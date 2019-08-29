import initialState from '../initialState';
import {LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../actions/authenticationAction';
export default function authenticationReducer(state=initialState.currentUser,action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isFetching: true,
            }
        case LOGIN_SUCCESS:
            console.log(action.usersObj);
            return Object.assign({}, state, {
                ...action.usersObj,
                isAuthenticated: true,
                isFetching: false,
            });
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                message: action.message,
                isAuthenticated:false,
                isFetching:false,
            });
        case LOGOUT_REQUEST:
            return {
                ...state,
                isAuthenticated:true,
                isFetching:true,
            }
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated:false,
                isFetching: false,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isAuthenticated: true,
                isFetching:false,
                message: action.message,
            }
        default:
            return state;
    }
}