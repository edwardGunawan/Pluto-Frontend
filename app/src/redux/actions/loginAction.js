import {validateUser} from '../../Services/userDetailsService';
import {ofType} from 'redux-observable';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(usersObj) {
    return {type: LOGIN_SUCCESS, payload: usersObj};
}

function loginFailed() {
    return {type: LOGIN_FAILED}
}


export function login(users) {
    return {type: 'LOGIN', payload: users};
}

export function loginEpic(actions$) {
    return actions$.pipe(
        ofType(LOGIN),
        tap(action => console.log('Logging login', action.payload)),
        mergeMap(({payload}) => {
            return ajax({
                url: `http://localhost:3001/login`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    payload
                }
            });
        }),
        tap((response) => console.log(response)),
        map((res) => {
            console.log(res.response);
            const {response} = res;
            // store in sessionStorage for accessToken
            return loginSuccess(response)
        }),
        catchError(e => {
            console.log(' Error occur', e);

        })
    )
}

// export function login(status,users) {
//     return async dispatch => {
//         try {
//             console.log('go through here');
//             const userObj = await validateUser(status,users);
//             dispatch(loginSuccess(userObj));
//         } catch(e) {
//             console.log(e.message);
//             throw e;
//         }
        
//     }
// }