// node_modules
import React, { lazy, Suspense } from 'react';
import {
  Switch, Route, Redirect
} from 'react-router-dom';

// components
import { NavBar } from './components/Nav/NavBar';

// css
import './App.css';

// pages
const Logs = lazy(() => import('./pages/Logs/Logs'));
const LogsDetail = lazy(() => import('./pages/Logs/LogsDetail/LogsDetail'));
const About = lazy(() => import('./pages/About/About'));

function App() {
  return (
    <>
      <NavBar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
                return (
                  <Redirect to="/logs" /> 
                )
            }}
          />
          <Route exact path="/logs" component={Logs} />
          <Route path="/logs/:id" component={LogsDetail} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
