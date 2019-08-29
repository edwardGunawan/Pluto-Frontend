import React from 'react';
import * as registrationActionCreators from '../../redux/actions/registerAction';
import * as authenticationActionCreators from '../../redux/actions/authenticationAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import TextInput from '../Common/TextInput';
import SelectInput from '../Common/SelectInput';

class Register extends React.Component {
    state = {
        user:{}
    }
    
    componentDidMount() {
        const { usersActions, username } = this.props;
        
        if(!username) {
            const accessToken = localStorage.getItem('access_token');
            console.log('getting access token', accessToken);
            usersActions.getUserInfoWithAccessToken(accessToken);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { registerActions } = this.props;
        const { user } = this.state;
        registerActions.submit(user);
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
            <div style={{width: '50%', height:'70%', margin: 'auto'}}>
            <h2>Registration</h2>
            { message && <Alert variant="danger"> {message} </Alert>}
            <Form onSubmit={this.handleSubmit}>
             
                <TextInput formLabel={'Username'} formType={'text'} handleChange={this.handleChange} value={username} name={'username'} placeholder= {'Enter Username'} />

                <TextInput formLabel={'Password'} formType={'password'} handleChange={this.handleChange} value={password} name={'password'} placeholder= {'Enter Password'} />

                <SelectInput label={'Team'} selections={teams} handleChange={this.handleChange} name={'team'} value={team}/>

                <TextInput formLabel={'Age'} formType={'text'} handleChange={this.handleChange} value={age} name={'age'} placeholder={'23'} />

                <SelectInput label={'Role'} selections={['Admin', 'User']} handleChange={this.handleChange} value={role} name={'role'} />


                <Button variant="primary" type="submit"> Submit </Button>

            </Form>
            </div>
        )
            
    }
    
} 



const mapStateToProps = ({registration, user}, ownProps) => {

    const { message =''} = registration;
    
    const { username, role, isAuthenticated } = user;
    const {history} = ownProps;
    if(message === 'success') history.push('/calenar');
    return {
        teams: role.Admin,
        message,
        username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerActions: bindActionCreators(registrationActionCreators,dispatch),
        usersActions : bindActionCreators(authenticationActionCreators,dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);