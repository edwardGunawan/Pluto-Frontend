import { ofType } from 'redux-observable';
import { mergeMap, tap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
export const SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION';
export const GET_TEAM_SELECTION = 'GET_TEAM_SELECTION';
export const INSERT_TEAM_INFO = 'INSERT_TEAM_INFO';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const submit = (requestBody) => ({
    type: SUBMIT_REGISTRATION,
    payload: requestBody,
});

export const getTeamSelection = (userName) => ({
    type: GET_TEAM_SELECTION,
    payload: userName,
});

export const insertTeamInfo = (payload) => ({type: INSERT_TEAM_INFO, payload});

const submitSuccess = () => ({type: FETCH_SUCCESS});



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
    mergeMap(({type, payload}) => {
        // using json-server for mock
        return ajax.getJSON('http://localhost:3001/team');
    }),
    tap(response => console.log('here in tap', response)), // log the file
    map(response => insertTeamInfo(response)),
    );

// export const submitRegistrationEpic = action$ => 
//     action$.pipe(
//         ofType(SUBMIT_REGISTRATION),
//         tap(action => console.log('submitting user registration', action)),
//         mergeMap(({type, payload}) => ajax.post({
//                 url: 'http://localhost:4000',
//                 method: 'POST',
//                 headers : {
//                     'Content-Type': 'aplication/json',
//                     'rxjs-custom-header': 'Rxjs'
//                 },
//                 body: {
//                     rxjs: 'Hello World!'
//                 }
//             })
//         ),
//         map(res => submitSuccess())
//     )