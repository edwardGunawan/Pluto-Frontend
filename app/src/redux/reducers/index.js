import {combineReducers} from 'redux';
import { combineEpics } from 'redux-observable';
import { getTeamSelectionEpic } from '../actions/registerAction';
import { loginEpic } from '../actions/loginAction';
import user from './loginReducer';
import registration from './registerReducer';

// put all your epic function here
export const rootEpic = combineEpics(getTeamSelectionEpic, loginEpic); 

const rootReducers = combineReducers({
    user,
    registration,
})

export default rootReducers;