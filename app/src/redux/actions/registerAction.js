export const GET_TEAM_SELECTION = 'GET_TEAM_SELECTION';
export const INSERT_TEAM_INFO = 'INSERT_TEAM_INFO';

export const SUBMIT_REGISTRATION_REQUEST = 'SUBMIT_REGISTRATION_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = "REGISTER_FAILED";
const URL = 'http://localhost:8080/register';

export const submit = (requestBody) => {
    return async dispatch => {
        try {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Types': 'application/json'
                },
                body: JSON.stringify(
                    {type: SUBMIT_REGISTRATION_REQUEST,
                    payload: requestBody,})
            });
            dispatch(registerSuccess());
        }catch (e) {
            dispatch(registerFailed(e.message));

        }
    }
};

export const insertTeamInfo = (payload) => ({type: INSERT_TEAM_INFO, payload});

const registerSuccess = () => ({type: REGISTER_SUCCESS});

const registerFailed = (message) => ({type : REGISTER_FAILED, message})
