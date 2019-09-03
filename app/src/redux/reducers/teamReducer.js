import {FETCH_USER_ERROR,FETCH_USER_IN_TEAM_SUCCESS, POPULATE_TEAM_NAME} from '../actions/teamAction';
import initialState from '../initialState';

export default function teamReducer(state=initialState.teams, action) {
    switch(action.type) {
        case FETCH_USER_IN_TEAM_SUCCESS:
            const {users, team} = action;
            return {
                ...state,
                [team] : Object.assign({}, state[team], {
                    users,
                })
            }
        case FETCH_USER_ERROR:
            const {message} = action;
            return {
                ...state,
                message,
            }
        case POPULATE_TEAM_NAME:
            const {teamsObj} = action;
            console.log(teamsObj);
            return {
                ...state,
                ...teamsObj,
            }
        default:
            return state;
    }
}