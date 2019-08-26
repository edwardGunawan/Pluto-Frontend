import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
function loginSuccess(usersObj) {
    return {
        type: LOGIN_SUCCESS,
        usersObj,
    };
}

export function loginRequest(users) {
    return {
        type: LOGIN_REQUEST, 
        cred: users
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILED,
        message,
    }
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
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


export function loginEpic(actions$) {
    return actions$.pipe(
        ofType(LOGIN_REQUEST),
        tap(action => console.log('Logging login', action)),
        mergeMap(({cred}) => {
            return ajax({
                url: `http://localhost:3001/login`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    cred
                }
            }).pipe(
                // it means that these all operation will be handle inside mergeMap
                // it makes it cleaner because mergeMap will return a stream
                // and this is what it does
                tap((response) => console.log('response from login', response)),
                map((res) => {
                    console.log(res.response);
                    const {response} = res;
                    // store in sessionStorage for accessToken
                    localStorage.setItem('access_token', response.accessToken);
                    return loginSuccess(response)
                }),
                // Here we placed the catchError() inside our mergeMap(), 
                // but after our AJAX call; this is important because if we 
                // let the error reach the action$.pipe(), it will terminate it 
                // and no longer listen for new actions.
                catchError(e => {
                    console.log(' Error occur', e);
                    return of(loginFailure(e.message));
                })
            );
        })
    )
}

export function logoutEpic(actions$) {
    return actions$.pipe(
        ofType(LOGOUT_REQUEST),
        tap(action => console.log('Logout', action)),
        mergeMap(() => {
            return ajax({
                url: `http://localhost:3001/logout`,
                method:'POST'
            }).pipe(
                tap((response) => console.log('response from logout')),
                map(({response}) => {
                    localStorage.removeItem('access_token');
                    return logoutSuccess(response);
                }),
                catchError(e => {
                    console.log('Error occur during logout... ', e);
                    return of(logoutFailure(e.message));
                })
            );
        }),
    );
}