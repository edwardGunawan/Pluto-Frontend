import {combineReducers} from 'redux';
import { combineEpics } from 'redux-observable';
import { getTeamSelectionEpic } from '../actions/registerAction';
import { loginEpic, logoutEpic } from '../actions/authenticationAction';
import user from './authenticationReducer';
import registration from './registerReducer';

// put all your epic function here
export const rootEpic = combineEpics(getTeamSelectionEpic, loginEpic, logoutEpic); 

const rootReducers = combineReducers({
    user,
    registration,
})

export default rootReducers;