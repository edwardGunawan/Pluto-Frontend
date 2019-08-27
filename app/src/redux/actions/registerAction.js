import { ofType } from 'redux-observable';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
export const GET_TEAM_SELECTION = 'GET_TEAM_SELECTION';
export const INSERT_TEAM_INFO = 'INSERT_TEAM_INFO';

export const SUBMIT_REGISTRATION_REQUEST = 'SUBMIT_REGISTRATION_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = "REGISTER_FAILED";

export const submit = (requestBody) => ({
        type: SUBMIT_REGISTRATION_REQUEST,
        payload: requestBody,
    });

export const getTeamSelection = (userName) => ({
    type: GET_TEAM_SELECTION,
    payload: userName,
});

export const insertTeamInfo = (payload) => ({type: INSERT_TEAM_INFO, payload});

const registerSuccess = () => ({type: REGISTER_SUCCESS});

const registerFailed = (message) => ({type : REGISTER_FAILED, message})



/*
 * 
 * You can also do it in with 
 *  registerEpic(action$) { // action$ here is a stream of actions
 *      return action$.ofType() // your type
 * }
 */
// getTeamSelectionEpic
export const getTeamSelectionEpic = action$ => 
    action$.pipe(
    ofType(GET_TEAM_SELECTION), // this is the same as filter(action => action === 'GET_TEAM_SELECTION')
    tap(action => console.log('go through getTeamSelectionEpic epic ', action)),
    mergeMap( ({payload}) => {
        // using json-server for mock
        return ajax.getJSON(`http://localhost:3001/teams/${payload}`);
    }),
    tap(response => console.log('here in tap', response)), // log the file
    map(response => insertTeamInfo(response)),
    );

export const submitRegistrationEpic = action$ => 
    action$.pipe(
        ofType(SUBMIT_REGISTRATION_REQUEST),
        tap(({payload}) => console.log('submitting user registration', payload)),
        mergeMap(({payload}) => ajax({
                url: 'http://localhost:3001/register',
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: {
                    user: payload 
                }
            }).pipe( // putting it here so that stream doesn't complete
                map(res => registerSuccess()),
                catchError(e => {
                    console.error('error in registering users ', e);
                    return of(registerFailed(e.message));
                })
            )
        ),
        
    )