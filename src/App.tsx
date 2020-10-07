// node_modules
import React from 'react';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Redirect, Switch, Route, Link,
} from 'react-router-dom';
import * as tauriDialog from 'tauri/api/dialog'

// css
import './App.css';

function Nav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button component={Link} to="/" color="inherit">
          Index
        </Button>
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
      </Toolbar>
    </AppBar>
  )
}

function Index() {
  async function onClick() {
    const dirs = await tauriDialog.open({ directory: true });
    console.log(dirs);
  }

  return (
    <div className="App">
      <Button type="button" onClick={onClick}></Button>
    </div>
  )
}

function About() {
  return (
    <div className="App">
      About
    </div>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/about" component={About} />
      </Switch>
    </>
  );
}

export default App;
