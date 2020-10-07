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

// components
import { GridContainer, GridItem } from './components/UI/Grid';

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
    console.log('read');
    setFiles([
      ...readDir
    ] as any);
  }
  return (
    <div className="App">
      <GridContainer direction="column">
        <div>
          <Button type="button" onClick={onClick}>Select Directory</Button>
        </div>
        {
          files.length
            ? files.map((file: any) => 
              <GridItem>
                {JSON.stringify(file, null, 2)}
              </GridItem>
            )
            : ''
        }
      </GridContainer>
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
