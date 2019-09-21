import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import TeamForm from './TeamForm';
import {Link, Redirect} from 'react-router-dom';
import {fetchAllUser} from '../../redux/actions/userAction';
import {fetchTeamBasedOnTeamId} from '../../redux/actions/singleTeamAction';
import {getUserInfoWithAccessToken} from '../../redux/actions/authenticationAction';
import {
    createNewTeam,
    updateTeam,
    fetchTeamBasedOnUser,
} from '../../redux/actions/teamAction'
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
/**
 * 
 * In order to make sure the users are not in both admins and user,
 * we keep a users array of all the users that is not yet selected.
 * Each time user choose admins selection to choose the user, it will automatically create a new input users.
 * And, the user will be deleted from the users pool.
 * So when they choose users selection input
 * to choose another one, the selection will not contain that user that just selected
 * in the admin, to prevent duplication.
 * 
 * When the user select the inputField, it will just automatically add the user 
 * to the team object. Each time it added to the team object, it will just genereate a 
 * new input field and automatically reset the value those selection will be insert to the teams group.
 * 
 * 
 * We will need to keep a buffer of the user pool. (Copy it in the state with hooks, so that the 
 * application data in the frontend doesn't get mutated or change, when the user hit cancel button)
 * There will always be a check if the value is in the team or not, only the value that is not 
 * in the team will show up. If the value is in the team. It will not show up. Therefore, there is none
 * need to have the logic of adding back to the user pool or removing it from user pool
 * 
 * Authority Issue: Everytime when the user create a new team, it will have automatically put that user 
 * in the new team. 
 * When the user wants to click on the specific team. The save or input button will be disabled fully if
 * the team doesn't have an admin authority on that team. They can only view.
 * 
 */
const ManageTeamPage = ({
    history,
    createNewTeam,
    updateTeam,
    fetchAllUser,
    fetchTeamBasedOnTeamId,
    fetchTeamBasedOnUser,
    getUserInfoWithAccessToken,
    username,
    slug,
    ...props }) => {

    const [users, setUsers] = useState([...props.users]); // this will get populated with useEffect
    const [team, setTeam] = useState({...props.team});

    useEffect(() => {
     if(props.users.length === 0)  {
         // fetch users here and populate users
         fetchAllUser().catch(err => alert(err));
     } else {
        setUsers([...props.users]);
     }

     if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken).then((user) => {
                return fetchTeamBasedOnUser(user.id);
            }).catch(err => alert(err));
    } else {
        setTeam({...props.team});
    }


    },[props.users, props.team]) // calling the props users and team data is changed to change the state, just like componentWillReceiveProps


    const handleChange = (formGroup) => (event) => {
        const {name, value} = event.target;
        // console.log('name', name, 'value', value);
        // if it is selected, automatically add to the team and create a new selection input
        // this can combine because the how the state is design in the component
        // name and value representing the property of the state
        if(formGroup === 'admins' || formGroup === 'users') {
            const newUserObj = users.find(user => user.username === value);

            setTeam(prevTeam => ({
                ...prevTeam,
                [name]: prevTeam[name].concat(newUserObj),
            }))

        }

        // if it is just chaging the name of the team set it to team
        else if(formGroup === 'name') {
            setTeam(prevTeam => ({
                ...prevTeam,
                [name] : value,
            }));
        } 
    }

    const handleDeleteClick = (authority,id) => (event) => {
        setTeam( prevTeam => ({
            ...prevTeam,
            [authority]: prevTeam[authority].filter(user => user.id !== id),
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(team.id) {
            updateTeam(team.id, team)
            .then(() => history.push('/teams'))
            .catch(err => alert(err));
        }else {
            createNewTeam(team)
            .then(() => history.push('/teams'))
            .catch(err => alert(err));
        }
    }


    // you don't need to re-add anything field because this function will automatically filtered it out
    // filter out the users that is not in team or that is not selected 
    const usernameList = getUsersNotInTeam(users, team)
    .map(user => user.username );
    return (
        <>
            <Link to={`/teams`}>Back</Link>
            {/* This also checks updates if the username is an admin or not, and then disabled the save button */}
            <TeamForm team={team} 
            usernameList={usernameList}
            handleSubmit={handleSubmit}
            handleChange={handleChange} 
            saving={!team.name || !(team.admins.length > 0) || !!team.admins.findIndex(admin => admin.username === username)}
            handleDeleteClick={handleDeleteClick}
             />
        </>
    )

}

export const newTeam = {
    admins: [],
    users: [],
    name: '',
}

// if the user create a new team, then that user will automatically be the admin
export const createTeamBasedOnUser = ({availableDates, id, username, name, email}) => {
    return {
        ...newTeam,
        admins: [{availableDates,id,username,name,email}],
    }
}


export const getTeamBySlug = (teams, slug) => {
    // team.id is number and slug is string, cannot use ===
    return teams.find(team => team.id == slug) || null;
}

// create a new team where the 
// getting users that is not in team
export const getUsersNotInTeam = (usersList, team={admins:[], name: '', users:[]}) => {
    const {admins = [], users = []} = team;
    return usersList.filter(user => {
        return !(!!admins.find(u=> u.id === user.id) || 
        !!users.find(u => u.id === user.id));
    });
}

// determine whether it is an update or not
const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.id;

    const team = slug && state.teams.team && state.teams.team.length > 0 ?
        getTeamBySlug(state.teams.team,slug) : createTeamBasedOnUser(state.user);
    return {
        team,
        users: state.users.userList || [],
        slug,
        username: state.user.username,
    }
}

const mapDispatchToProps = {
    createNewTeam,
    updateTeam,
    fetchAllUser,
    fetchTeamBasedOnTeamId,
    fetchTeamBasedOnUser,
    getUserInfoWithAccessToken
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageTeamPage);