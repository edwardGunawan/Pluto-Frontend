import React from 'react';
import * as registrationActionCreators from '../../redux/actions/registerAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class Register extends React.Component {
    state = {
        user:{}
    }
    
    componentDidMount() {
        const { actions, username } = this.props;

        actions.getTeamSelection(username);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { actions } = this.props;
        const { user } = this.state;
        actions.submit(user);
    }

    handleChange = event => {
        // console.log('onchange triggered', event.target.name);
        const {name, value} = event.target;
        const {user} = this.state;

        const updatedUser = {
            ...user,
            [name]: value,
        }

        this.setState({user: updatedUser});
    }
    
    render () {
        const {teams=[], message} = this.props;
        const {
            username = '',
            password = '',
            team = '',
            age = '',
            role = '',
        } = this.state.user;

        return (
            <Form onSubmit={this.handleSubmit}>
                <h2>Registration</h2>
                { message && <Alert variant="danger"> {message} </Alert>}
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={this.handleChange} name="username" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={this.handleChange} name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group contorlId="formBasicTeam">
                    <Form.Label>Team</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} name="team" value={team}>
                        <option>Select ...</option>
                        {teams.length > 0 && teams.map((team, idx) => {
                            return (
                                <option key={`${team}-${idx}`}>{team}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control placeholder="23" onChange={this.handleChange} name="age" value={age}/>
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                     
                    <Form.Control as="select" name="role" onChange={this.handleChange} value={role}>
                        <option>Select...</option>
                        <option>Admin</option>
                        <option>User</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit"> Submit </Button>

            </Form>
        )
            
    }
    
} 



const mapStateToProps = ({registration, user}, ownProps) => {

    const { teams = [], message =''} = registration;
    
    const { username, isAuthenticated } = user;
    const {history} = ownProps;
    if(message === 'success') history.push('/calenar')
    if(!isAuthenticated) history.push('/');
    return {
        teams,
        message,
        username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(registrationActionCreators,dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);