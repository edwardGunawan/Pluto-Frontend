
import {fetchTeamBasedOnUser} from './teamAction';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const GET_USER_INFO_WITH_ACCESS_TOKEN = 'GET_USER_INFO_WITH_ACCESS_TOKEN';
function loginSuccess(usersObj) {
    return {
        type: LOGIN_SUCCESS,
        usersObj,
    };
}

export function loginRequest(users) {
    return async dispatch => {
        try{
            const response = await fetch(`http://localhost:8080/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    users
                }
            });
            dispatch(loginSuccess(response));
        } catch (e) {
            dispatch(loginFailure(e.message));
        }
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILED,
        message,
    }
}

export function logoutRequest() {
    return async dispatch => {
        try{
            const url = `http://localhost:8080/logout`;
            const response = await fetch(url,{ method:'POST'});
            localStorage.removeItem('access_token');
            dispatch(logoutSuccess(response));
        } catch(e) {
            dispatch(logoutFailure(e.message));
        }
    }
}

function logoutSuccess(message) {
    return {
        type: LOGOUT_SUCCESS,
        message,
    }
}

function logoutFailure(message) {
    return {
        type: LOGOUT_FAILURE,
        message,
    } 
}

export function getUserInfoWithAccessToken(token) {
    return async dispatch => {
        try {
            const url = `http://localhost:8080/api/v1/users/1`; // get 2 for now
            const response = await fetch(url, {
                method: 'GET',
                header: {
                    accessToken:`bearer-${token}`
                }
            });
            const specificUser = await response.json();
            console.log('response in getInfoWithAccessToken ', specificUser);
            // insert login success
            dispatch(loginSuccess(specificUser));
            return specificUser;
        } catch(e) {
            dispatch(loginFailure(e.message))
        }
    }
}