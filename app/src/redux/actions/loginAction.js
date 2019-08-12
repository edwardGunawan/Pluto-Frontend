import {validateUser} from '../../Services/userDetailsService';
function loginSuccess(usersObj) {
    return {type: 'LOGIN_SUCCESS', payload: usersObj};
}




export function login(status,users) {
    return async dispatch => {
        try {
            console.log('go through here');
            const userObj = await validateUser(status,users);
            dispatch(loginSuccess(userObj));
        } catch(e) {
            console.log(e.message);
            throw e;
        }
        
    }
}