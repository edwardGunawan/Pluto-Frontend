import initialState from '../initialState';
import {LOGIN_FAILED, LOGIN_SUCCESS} from '../actions/loginAction';
export default function loginReducer(state=initialState.currentUser,action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log(action.payload);
            console.log(state);
            const {accessToken, userInfo} = action.payload;
            return {
                ...state,
                accessToken,
                ...userInfo,
            };
        case LOGIN_FAILED:
        default:
            return state;
    }
}