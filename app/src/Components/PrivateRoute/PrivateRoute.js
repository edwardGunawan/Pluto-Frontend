import React from 'react';
import {Route, Redirect} from 'react-router-dom';
/*
    This causes infinite loop for in App, need to figure out why
*/
const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(fakeAuth.isAuthenticated);
    return (
        <Route 
            {...rest}
            render = {props => 
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ): (
                    <Redirect 
                        to={{
                            path: '/login',
                            state: {from: props.location}
                        }} 
                    />
                )
            }
        />
    )
    
}

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

  export default PrivateRoute;