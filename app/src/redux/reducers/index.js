import {combineReducers} from 'redux';
import { combineEpics } from 'redux-observable';
import { getTeamSelectionEpic } from '../actions/registerAction';
import login from './loginReducer';
import registration from './registerReducer';

// put all your epic function here
export const rootEpic = combineEpics(getTeamSelectionEpic); 

const rootReducers = combineReducers({
    login,
    registration,
})

export default rootReducers;