import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/actions/authenticationAction';



class Login extends Component {
    state = {
        role: 'Admin',
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {role,email,password} = this.state;
        const {validate} = this.props;
        console.log('on submit gets called', email, password);    
        console.log(validate);
        validate({role,email,password});
        
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const updatedUsersInfo = {
            ...this.state,
            [name]: value,
        }
        this.setState(updatedUsersInfo);
    }

    handleChangerole = (e) => {
        const { role } = this.state;
        this.setState({role: role === 'Admin' ? 'User' : 'Admin'})
    }

    render() {
        const {role, email, password} = this.state;
        return (
          <Form onSubmit={this.handleSubmit}>
            <h2>{role} Login</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={email} onChange={this.handleChange} placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={password}  onChange={this.handleChange} placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button size="sm" variant="link" onClick={this.handleChangerole}>I am not {role}</Button>
          </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {role, email, isAuthenticated} = state.user;
    console.log(isAuthenticated);
    const {history} = ownProps;
    if(isAuthenticated) history.push('/');
    return {
        role,
        email,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        validate: (user) => {
            dispatch(authenticationAction.loginRequest(user));
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);