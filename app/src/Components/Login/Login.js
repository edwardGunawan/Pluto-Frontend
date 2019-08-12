import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from 'react-redux';
import * as loginActions from '../../redux/actions/loginAction';



class Login extends Component {
    state = {
        status: 'Admin',
        usersInfo: {
            email: '',
            password: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {status,usersInfo} = this.state;
        const {validate} = this.props;
        console.log('on submit gets called', usersInfo);    
        console.log(validate);
        validate(status,usersInfo);
        
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {usersInfo} = this.state;
        const updatedUsersInfo = {
            ...usersInfo,
            [name]: value,
        }
        this.setState({usersInfo: updatedUsersInfo});
    }

    handleChangeStatus = (e) => {
        const { status } = this.state;
        this.setState({status: status === 'Admin' ? 'User' : 'Admin'})
    }

    render() {
        const {status, usersInfo} = this.state;
        const {email, password} = usersInfo;
        return (
          <Form onSubmit={this.handleSubmit}>
            <h2>{status} Login</h2>
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
            <Button size="sm" variant="link" onClick={this.handleChangeStatus}>I am not {status}</Button>
          </Form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {status, usersInfo, isAuthenticated} = state.login;
    const {history} = ownProps;
    if(isAuthenticated) history.push('/');
    return {
        status,
        usersInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        validate: (status,users) => {
            dispatch(loginActions.login(status,users));
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);