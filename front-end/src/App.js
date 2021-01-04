import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Login from './components/Login/Login';
import SurveyForm from './components/SurveyForms/SurveyForm/SurveyForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Preview from './components/SurveyForms/SurveyForm/Preview';
import SurveyContainer from './container/SurveyContainer';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
          <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/login" />  
                    )
                }}
              />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/forms" exact isAuthenticated={isAuthenticated} component={SurveyContainer} />
            <PrivateRoute path="/forms/create" exact isAuthenticated={isAuthenticated} component={SurveyForm} />
            <Route path="/forms/:surveyId" component={Preview} />
          </Switch>
    </Router>
  );
}

export default App;
