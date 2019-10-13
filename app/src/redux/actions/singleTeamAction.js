// export const FETCH_SPECIFIC_TEAM = 'FETCH_SPECIFIC_TEAM';
export const FETCH_SPECIFIC_TEAM_SUCCESS = 'FETCH_SPECIFIC_TEAM_SUCCESS';
export const FETCH_SPECIFIC_TEAM_ERROR = 'FETCH_SPECIFIC_TEAM_ERROR';

export function fetchTeamBasedOnTeamId(id) { 
    return async dispatch => {
        try {
            const URL = `http://localhost:8080/api/v1/teams/${id}`;
            const response = await fetch(URL);
            const json = await response.json();
            console.log('json value after in fetchTeamBasedOnTeamId', json);
            dispatch(fetchTeamBasedOnTeamIdSuccess(json));
        }catch(e) {
            console.error(e);
            dispatch(fetchTeamBasedOnTeamIdError(e.message));
            throw(e);
        }
    }
}

function fetchTeamBasedOnTeamIdSuccess(team) {
    return {type: FETCH_SPECIFIC_TEAM_SUCCESS, team};
}

function fetchTeamBasedOnTeamIdError(message) {
    return {type: FETCH_SPECIFIC_TEAM_ERROR, message};
}