import React from 'react';
import * as registrationActionCreators from '../../redux/actions/registerAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class Register extends React.Component {
    componentDidMount() {
        const { actions } = this.props;
        console.log(actions);
        actions.getTeamSelection('user');
    }
    
    render () {
        const {registration=[]} = this.props;
        return (
            <Form>
                <h2>Registration</h2>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group contorlId="formBasicTeam">
                    <Form.Label>Team</Form.Label>
                    <Form.Control as="select">
                        {registration.length > 0 && registration.map(team => {
                            return (
                                <option>{team}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control placeholder="23" />
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select">
                        <option>Admin</option>
                        <option>Agent</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit"> Submit </Button>

            </Form>
        )
            
    }
    
} 



const mapStateToProps = ({registration}) => {
    console.log(registration);
    return {
        registration,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(registrationActionCreators,dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);