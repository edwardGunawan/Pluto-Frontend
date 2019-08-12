import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Login from '../Login';
import Header from '../Header';
import {connect} from 'react-redux';


const fakeAuth = {
    isAuthenticated: false,
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
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {isAuthenticated} = state.login;
    if(!isAuthenticated) ownProps.history.push('/login');
    return {
        isAuthenticated,
    }
}

export default withRouter(connect(mapStateToProps)(Main));