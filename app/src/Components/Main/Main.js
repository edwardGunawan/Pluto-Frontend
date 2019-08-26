import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Login from '../Login';
import Header from '../Header';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Register from '../Register';
import Home from '../Home';
import AssignDates from '../AssignDates';

import * as authenticationAction from '../../redux/actions/authenticationAction';


class Main extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    const {logout} = this.props;
    e.preventDefault();

    logout();

  }
    
    render() {
        return (
            <div>
              <Header onLogout={this.handleLogout}/>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/assign-dates" component={AssignDates}/>
              </Switch>
              
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('here in main', state.user);
    const {isAuthenticated} = state.user;
    if(!isAuthenticated) ownProps.history.push('/login');
    return {}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authenticationAction.logoutRequest())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));