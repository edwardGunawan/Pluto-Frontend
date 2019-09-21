export const FETCH_ALL_USER = 'FETCH_ALL_USER';
export const FETCH_ALL_USER_SUCCESS = 'FETCH_ALL_USER_SUCCESS';
export const FETCH_ALL_USER_ERROR = 'FETCH_ALL_USER_ERROR';

export function fetchAllUser() {
    return async dispatch => {
        try {
            console.log('getting through fetchAllUser in userAction');
            const URL = 'http://localhost:8080/api/v1/users';
            const response = await fetch(URL);
            const users = await response.json();
            // debugger;
            console.log('finishing fetching all User in user Action',users);
            dispatch(fetchAllUserSuccess(users));
        }catch(e) {
            console.error(e);
            dispatch(fetchAllUserError(e.message));
        }
    }
}

function fetchAllUserSuccess(userList){
    return {type: FETCH_ALL_USER_SUCCESS, userList};
}

function fetchAllUserError(message) {
    return {type: FETCH_ALL_USER_ERROR, message};
}