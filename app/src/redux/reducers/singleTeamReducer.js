import {FETCH_SPECIFIC_TEAM_SUCCESS, FETCH_SPECIFIC_TEAM_ERROR} from '../actions/singleTeamAction';
import initialState from '../initialState';


export default function singleTeamReducer(state=initialState.team, action) {
    switch(action.type) {
        case FETCH_SPECIFIC_TEAM_SUCCESS:
            return {message: 'success', team:action.team};
        case FETCH_SPECIFIC_TEAM_ERROR:
            return {message: action.message}
        default:
            return state;
    }
}