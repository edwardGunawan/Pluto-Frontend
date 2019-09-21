import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import TeamForm from './TeamForm';
import {Link} from 'react-router-dom';
import {fetchAllUser} from '../../redux/actions/userAction';
import {fetchTeamBasedOnTeamId} from '../../redux/actions/singleTeamAction';
import {getUserInfoWithAccessToken} from '../../redux/actions/authenticationAction';
import {
    createNewTeam,
    updateTeam,
    fetchTeamBasedOnUser,
} from '../../redux/actions/teamAction'
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
    }

    if(team) {
        setTeam({...props.team});
    }

    },[props.users, props.team]) // calling the props users change to change the state, just like componentWillReceiveProps

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
        // console.log(event);
        // console.log(team.id);
        
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
    console.log('usernameList ', usernameList, team);
    
    return (
        <>
            <Link to={`/teams`}>Back</Link>
            <TeamForm team={team} 
            usernameList={usernameList}
            handleSubmit={handleSubmit}
            handleChange={handleChange} 
            saving={!team.name || !(team.admins.length > 0)}
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

// getting teams
export const getTeamBySlug = (teams, slug) => {
    return teams.find(team => team.id == slug) || null;
}

// getting users that is not in team
export const getUsersNotInTeam = (usersList, team={admins:[], name: '', users:[]}) => {
    console.log(usersList);
    console.log('in getUsersNotInTeam', team);
    const {admins = [], users = []} = team;
    return usersList.filter(user => {
        return !(!!admins.find(u=> u.id === user.id) || 
        !!users.find(u => u.id === user.id));
    });
}

// determine whether it is an update or not
const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.id;
    console.log('slug in mapStateToProps', slug, state.teams);
    const team = slug && state.teams.team && state.teams.team.length > 0 ?
        getTeamBySlug(state.teams.team,slug) : newTeam;
    // const usersNotInTeam = getUsersNotInTeam(state.users,team);
    // console.log('users in shere in state',state.users);
    console.log('here in manage team page', state.user, team)
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