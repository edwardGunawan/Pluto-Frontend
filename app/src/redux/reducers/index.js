import {combineReducers} from 'redux';
import login from './loginReducer';

const rootReducers = combineReducers({
    login,
})

export default rootReducers;