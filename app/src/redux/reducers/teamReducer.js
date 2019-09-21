import { 
        //  FETCH_USER_ERROR,
        //  FETCH_USER_IN_TEAM_SUCCESS, 
        //  POPULATE_TEAM_NAME,
         FETCH_TEAM_SUCCESS,
         FETCH_TEAM_ERROR,
         CREATE_TEAM_SUCCESS,
         CREATE_TEAM_ERROR,
         UDPATE_TEAM_SUCCESS,
         UPDATE_TEAM_ERROR,
         DELETE_TEAM_SUCCESS,
         DELETE_TEAM_ERROR
        } from '../actions/teamAction';
import initialState from '../initialState';

export default function teamReducer(state=initialState.teams, action) {
    switch(action.type) {
        
        case FETCH_TEAM_SUCCESS:
            return {
                message: 'success',
                team: action.team.map(t => t),
            }
        case UDPATE_TEAM_SUCCESS:
            return {
                message: 'success',
                team: state.team.map(t => {
                    if(t.id === action.team.id) { // this causes the error for mapping undefined, it changes the state
                        return action.team;
                    }
                    return t;
                })
            }
        case CREATE_TEAM_SUCCESS:
            return {
                message: 'success',
                team: state.team.concat(action.team),
            }
        case DELETE_TEAM_SUCCESS:
            return {
                    message: 'success',
                    team: state.team.filter(t => t.id !== action.teamId),
                }
        case FETCH_TEAM_ERROR:
        case UPDATE_TEAM_ERROR:
        case CREATE_TEAM_ERROR:
        case DELETE_TEAM_ERROR:
            return {
                message: action.message,
            }
        default:
            return state;
    }
}