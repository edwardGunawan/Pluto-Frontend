import {combineReducers} from 'redux';
import { combineEpics } from 'redux-observable';

import { submitRegistrationEpic } from '../actions/registerAction';
import { loginEpic, logoutEpic, getUserInfoEpic } from '../actions/authenticationAction';
import { fetchTeamEpic } from '../actions/teamAction';
import { fetchEventsEpic, updateEventsEpic} from '../actions/eventsAction';



import user from './authenticationReducer';
import registration from './registerReducer';
import teams from './teamReducer';
import events from './eventsReducer';


// put all your epic function here
export const rootEpic = combineEpics(
    submitRegistrationEpic,
    loginEpic, 
    logoutEpic,
    getUserInfoEpic,
    fetchTeamEpic,
    fetchEventsEpic,
    // createEventsEpic,
    updateEventsEpic,
    ); 

const rootReducers = combineReducers({
    user,
    teams,
    registration,
    events,
})

export default rootReducers;