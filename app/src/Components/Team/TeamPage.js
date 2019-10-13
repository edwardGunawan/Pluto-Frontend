import React from 'react';
import {connect} from 'react-redux';
import {fetchTeamBasedOnUser, deleteTeam} from '../../redux/actions/teamAction';
import {getUserInfoWithAccessToken} from '../../redux/actions/authenticationAction';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import TeamList from './TeamList';
import _ from 'lodash';

class TeamPage extends React.Component {
    state = {
        redirectToManageTeamPage: false,
    }

    componentDidMount() {
        const {username,teams, getUserInfoWithAccessToken, fetchTeamBasedOnUser} = this.props;
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            getUserInfoWithAccessToken(accessToken).then((user) => {
                return fetchTeamBasedOnUser(user.id);
            }).catch(err => alert(err));
        }
    }


    handleDelete = (id) => (e) =>{
        e.preventDefault();
        this.props.deleteTeam(id)
        .catch(err => alert(err));
    }

    render() {
        const {redirectToManageTeamPage} = this.state;
        const {teams} = this.props;

        return (
            <>
                {redirectToManageTeamPage && <Redirect to={'/team'} />}
                <Button onClick={() => this.setState({redirectToManageTeamPage: true})}>Create Team</Button>
                <TeamList teams={teams} handleDelete={this.handleDelete} />
            </>
        )
    }
}


const mapStateToProps = ({teams, user}) => {
    const {username} = user;
    const team = teams && teams.team && teams.team.length > 0 && teams.team || [];
    return {
        teams: team,
        username,
    }
}

const matpDispatchToProps = {
    fetchTeamBasedOnUser,
    getUserInfoWithAccessToken,
    deleteTeam,
}


export default connect(mapStateToProps,matpDispatchToProps)(TeamPage);