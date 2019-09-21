// import colorSelection from '../../Components/util/ColorSelection';

export const FETCH_USER_IN_TEAM_SUCCESS = 'FETCH_USER_IN_TEAM_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS';
export const FETCH_TEAM_ERROR = 'FETCH_TEAM_ERROR';

export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_ERROR = 'CREATE_TEAM_ERROR';

export const UDPATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_ERROR = 'UDPATE_TEAM_ERROR';

export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_ERROR = 'DELETE_TEAM_ERROR';


export const POPULATE_TEAM_NAME = 'POPULATE_TEAM_NAME';
/**
 * 
 * GET Team based on UserId
 */
export const fetchTeamBasedOnUser = (userId) => {
    return async dispatch => {
        try {
            console.log('go through fetchBasedOnUser');
            const URL = `http://localhost:8080/api/v1/teams?userId=${userId}`;
            const response = await fetch(URL);
            const json = await response.json();
            console.log('return json from fetchTeamBasedOnUser', json);
            dispatch(fetchTeamSuccess(json));
            return json;
        } catch(e) {
            console.error(e);
            dispatch(fetchTeamError(e.message));
        }
    }
}

const fetchTeamSuccess = (team) => ({type: FETCH_TEAM_SUCCESS, team});
const fetchTeamError = (message) => ({type: FETCH_TEAM_ERROR, message});



/**
 * 
 * Create Team
 */
export const createNewTeam = (team) => {
    return async dispatch => {
        try {
            const URL = `http://localhost:8080/api/v1/teams`;
            console.log('about to fetch in teamAction ', team);
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(team)
            });
            const newTeam = await response.json();
            console.log('end result team ', newTeam);
            dispatch(createTeamSuccess(newTeam));
        } catch(e) {
            console.error(e);
            dispatch(createTeamError(e.message));
        }
    }
}

const createTeamSuccess = (newTeam) => ({type: CREATE_TEAM_SUCCESS, team: newTeam});
const createTeamError = (message) => ({ type: CREATE_TEAM_ERROR, message});

/**
 * 
 * UPDATE team
 */
export const updateTeam = (id,team) => {
    return async dispatch => {
        try{
            const URL = `http://localhost:8080/api/v1/teams/${id}`
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team)
            });
            const json = await response.json();
            dispatch(updateTeamSuccess(json));
        } catch(e) {
            console.error(e);
            dispatch(updateTeamError(e.message));
        }
    }
}

const updateTeamSuccess = (updatedTeam) => ({type: UDPATE_TEAM_SUCCESS, team: updatedTeam});
const updateTeamError = (message) => ({type: UPDATE_TEAM_ERROR, message});


/**
 * 
 * DELETE team
 */
export const deleteTeam = (teamId) => {
    return async dispatch => {
        try {
            const URL = `http://localhost:8080/api/v1/teams/${teamId}`;
            await fetch(URL, {
                method: 'DELETE',
            });
            console.log('success');
            dispatch(deleteTeamSuccess(teamId));
        } catch(e) {
            console.error(e);
            dispatch(deleteTeamError(e.message));
        }
    }
}

const deleteTeamSuccess = (teamId) => ({ type: DELETE_TEAM_SUCCESS, teamId});
const deleteTeamError = (message) => ({ type: DELETE_TEAM_ERROR, message});




// export const fetchUserInTeam = (team) => {
//     return async dispatch => {
//         try {
//             const response = await fetch(`http://localhost:8080/teams/${team}`);
//             const json = await response.json();
//             dispatch(fetchUserInTeamSuccess(json));
//         }catch (e) {
//             dispatch(fetchUserError(e.message));
//         }
//     }
// };
// // populate team name in calendar page
// export const populateTeamName = (teams) => {
    
//     const teamsObj = teams.reduce((acc,currVal) => {
//         return {
//             ...acc,
//             [currVal] : { users: null, color: colorSelection[0]}
//         }
//     },{});

//     return {
//         type: POPULATE_TEAM_NAME, teamsObj,
//     }
// }

// const fetchUserInTeamSuccess = ({id, teamName, users}) => ({type: FETCH_USER_IN_TEAM_SUCCESS, teamName, users, id});
// const fetchUserError = (message) => ({type: FETCH_USER_ERROR, message});
