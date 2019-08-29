import {combineReducers} from 'redux';
import { combineEpics } from 'redux-observable';
import { submitRegistrationEpic } from '../actions/registerAction';
import { loginEpic, logoutEpic, getUserInfoEpic } from '../actions/authenticationAction';
import { fetchTeamEpic } from '../actions/teamAction';
import user from './authenticationReducer';
import registration from './registerReducer';
import teams from './teamReducer';

// put all your epic function here
export const rootEpic = combineEpics(
    submitRegistrationEpic,
    loginEpic, 
    logoutEpic,
    getUserInfoEpic,
    fetchTeamEpic); 

const rootReducers = combineReducers({
    user,
    teams,
    registration,
})

export default rootReducers;