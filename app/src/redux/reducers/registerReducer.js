import initialState from '../initialState';
import {FETCH_SUCCESS, INSERT_TEAM_INFO} from '../actions/registerAction';

export default function registerReducer(state = initialState.users.teams,  action) {
    console.log(action.type);
    switch(action.type) {
        case INSERT_TEAM_INFO:
            return action.payload;
        case FETCH_SUCCESS:
        default:
            return state;
    }
}