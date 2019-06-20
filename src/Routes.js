import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  // Home,
  NotFound,
  Login,
  Signup,
  Notes,
  NewNote,
  Settings,
  Welcome,
  WelcomeInfo,
  WizardContainer
} from './components/containers';
import {
  AppliedRoute,
  AuthenticatedRoute,
  UnauthenticatedRoute
} from './components/presentation';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Welcome} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/welcome"
      exact
      component={WelcomeInfo}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/get-your-quote/:info"
      exact
      component={WizardContainer}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings"
      exact
      component={Settings}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/:id"
      exact
      component={Notes}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
