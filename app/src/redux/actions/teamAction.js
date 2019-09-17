import colorSelection from '../../Components/util/ColorSelection';

export const FETCH_USER_IN_TEAM_SUCCESS = 'FETCH_USER_IN_TEAM_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';



export const POPULATE_TEAM_NAME = 'POPULATE_TEAM_NAME';


export const fetchUserInTeam = (team) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:8080/teams/${team}`);
            const json = await response.json();
            dispatch(fetchUserInTeamSuccess(json));
        }catch (e) {
            dispatch(fetchUserError(e.message));
        }
    }
};
// populate team name in calendar page
export const populateTeamName = (teams) => {
    
    const teamsObj = teams.reduce((acc,currVal) => {
        return {
            ...acc,
            [currVal] : { users: null, color: colorSelection[0]}
        }
    },{});

    return {
        type: POPULATE_TEAM_NAME, teamsObj,
    }
}

const fetchUserInTeamSuccess = ({id, teamName, users}) => ({type: FETCH_USER_IN_TEAM_SUCCESS, teamName, users, id});
const fetchUserError = (message) => ({type: FETCH_USER_ERROR, message});
