import {combineReducers} from 'redux';
// import { combineEpics } from 'redux-observable';

// import { submitRegistrationEpic } from '../actions/registerAction';
// import { loginEpic, logoutEpic, getUserInfoEpic } from '../actions/authenticationAction';
// import { fetchTeamEpic } from '../actions/teamAction';
// import { fetchEventsEpic, updateEventsEpic, deleteEventsEpic} from '../actions/eventsAction';



import user from './authenticationReducer';
import users from '../reducers/userReducer';
import registration from './registerReducer';
import teams from './teamReducer';
import team from './singleTeamReducer';
import events from './eventsReducer';


// put all your epic function here
// export const rootEpic = combineEpics(
//     submitRegistrationEpic,
//     loginEpic, 
//     logoutEpic,
//     getUserInfoEpic,
//     fetchTeamEpic,
//     fetchEventsEpic,
//     updateEventsEpic,
//     deleteEventsEpic
//     ); 

const rootReducers = combineReducers({
    user,
    users,
    teams,
    team,
    registration,
    events,
})

export default rootReducers;