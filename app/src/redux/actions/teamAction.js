import {ofType} from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, catchError, tap, mapTo } from 'rxjs/operators';

const FETCH_USER_IN_TEAM = 'FETCH_USER_IN_TEAM';

export const FETCH_USER_IN_TEAM_SUCCESS = 'FETCH_USER_IN_TEAM_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const fetchUserInTeam = (team) => ({type: FETCH_USER_IN_TEAM, team});
const fetchUserInTeamSuccess = ({teamName, users}) => ({type: FETCH_USER_IN_TEAM_SUCCESS, team:teamName, users});
const fetchUserError = (message) => ({type: FETCH_USER_ERROR, message});


export const fetchTeamEpic = (action$) => 
            action$.pipe(
                ofType(FETCH_USER_IN_TEAM),
                tap((action) => console.log(action)),
                mergeMap(({team}) => 
                    ajax.getJSON(`http://localhost:3001/teams/${team}`).pipe(
                        tap((response) => console.log('response in team epic ', response)),
                        mapTo((res) => fetchUserInTeamSuccess(res)),
                        catchError((e) => {
                            console.error(e);
                            return of(fetchUserError(e.message));
                        })
                    )
                )
            );