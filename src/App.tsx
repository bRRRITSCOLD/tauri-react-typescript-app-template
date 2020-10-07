// node_modules
import React, { useState } from 'react';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Redirect, Switch, Route, Link,
} from 'react-router-dom';
import * as tauriDialog from 'tauri/api/dialog'
import * as tauriFs from 'tauri/api/fs'

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
  const [files, setFiles] = useState([]);

  async function onClick() {
    const dir: any = await tauriDialog.open({ directory: true });
    const readDir: any[] = await tauriFs.readDir(dir, { recursive: true } as any);
    setFiles([
      ...files,
      ...readDir
    ] as any);
  }
  return (
    <div className="App">
      <Button type="button" onClick={onClick}>Select Directory</Button>
      {
        files.length
          ? <>
              {JSON.stringify(files, null, 2)}
            </>
          : ''
      }
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
