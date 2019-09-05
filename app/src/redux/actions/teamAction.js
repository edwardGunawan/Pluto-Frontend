import {ofType} from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, catchError, tap, map } from 'rxjs/operators';

const FETCH_USER_IN_TEAM = 'FETCH_USER_IN_TEAM';


export const FETCH_USER_IN_TEAM_SUCCESS = 'FETCH_USER_IN_TEAM_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';



export const POPULATE_TEAM_NAME = 'POPULATE_TEAM_NAME';


export const fetchUserInTeam = (team) => ({type: FETCH_USER_IN_TEAM, team});
// populate team name in calendar page
export const populateTeamName = (teams) => {
    const teamsObj = teams.reduce((acc,currVal) => {
        return {
            ...acc,
            [currVal] : { users: null }
        }
    },{});

    return {
        type: POPULATE_TEAM_NAME, teamsObj,
    }
}
const fetchUserInTeamSuccess = ({id, teamName, users}) => ({type: FETCH_USER_IN_TEAM_SUCCESS, teamName, users, id});
const fetchUserError = (message) => ({type: FETCH_USER_ERROR, message});





export const fetchTeamEpic = (action$) => 
            action$.pipe(
                ofType(FETCH_USER_IN_TEAM),
                tap((action) => console.log(action)),
                mergeMap(({team}) => 
                    ajax.getJSON(`http://localhost:3001/teams/${team}`).pipe(
                        tap((response) => console.log('response in team epic ', response)),
                        map((res) => fetchUserInTeamSuccess(res)),
                        catchError((e) => {
                            console.error(e);
                            return of(fetchUserError(e.message));
                        })
                    )
                )
            );

