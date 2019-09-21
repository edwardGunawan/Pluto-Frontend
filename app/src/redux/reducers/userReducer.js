import {FETCH_ALL_USER_SUCCESS, FETCH_ALL_USER_ERROR} from '../actions/userAction';
import initialState from '../initialState';

export default function userReducer(state = initialState.users, action) {
    switch(action.type) {
        case FETCH_ALL_USER_SUCCESS:
            return {message: 'success', userList: action.userList};
        case FETCH_ALL_USER_ERROR:
            return {message: action.message};
        default: 
            return state;
    }
}