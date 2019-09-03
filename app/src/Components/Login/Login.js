import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/actions/authenticationAction';

import TextInput from '../Common/TextInput';

const Login = ({validate})  => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // const {email,password} = this.state;
        const {email, password} = formData;
        // const {validate} = this.props;
        console.log('on submit gets called', email, password);    
        console.log(validate);
        validate({email,password});
        
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const {email, password} = formData;
    return (
        <div style={{width: '50%', height:'70%', margin: 'auto', marginTop:'40px'}}>
        <h2> Login </h2>
        <Form onSubmit={e => handleSubmit(e)}>
            <TextInput formLabel={'Email address'} formType={'email'} value={email} name={'email'} handleChange={e => handleChange(e)} placeholder={'Enter Email'} />
            <TextInput formLabel={'Password'} formType={'password'} value={password} name={'password'} handleChange={e => handleChange(e)} placeholder={'Password'} />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    const { email, isAuthenticated} = state.user;
    console.log(isAuthenticated);
    const {history} = ownProps;
    if(isAuthenticated) history.push('/home');
    return {
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