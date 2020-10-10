// node_modules
import React, { lazy, Suspense } from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// components
import { NavBar } from './components/Nav/NavBar';

// css
import './App.css';

// pages
const Index = lazy(() => import('./pages/Index/Index'));
const About = lazy(() => import('./pages/About/About'));

function App() {
  return (
    <>
      <NavBar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
