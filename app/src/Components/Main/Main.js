import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Login from '../Login';
import Header from '../Header';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Register from '../Register';
import Home from '../Home';
import AssignDates from '../AssignDates';


const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

class Main extends Component {
    
    render() {
        return (
            <div>
              <Header />
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
    const {accessToken} = state.user;
    if(!accessToken) ownProps.history.push('/login');
    return {}
}

export default withRouter(connect(mapStateToProps)(Main));