import React from 'react';
import './App.css';
import Header  from '../Header';
import AppRoute from '../AppRoute';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from '../../redux/configureStore';
import initialState from '../../redux/initialState';
const store = configureStore(initialState);
function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <AppRoute />
      </Router>
    </ReduxProvider>
    
  );
}

export default App;
