import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Main from '../Main';

export const AppRoute = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            {/* <PrivateRoute path="/main" component={Main} /> */}
            <Route path="/" component={Main}/>
        </Switch>
    )
}


