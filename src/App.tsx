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
import { Table } from './components/UI/Table/Table';

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


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: any) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: any) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: any) => value.toFixed(2),
  },
];

function createData(name: any, code: any, population: any, size: any) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function Index() {
  const [files, setFiles] = useState([]);
  const [dirName, setDirName] = useState('');

  async function onClick() {
    const dir: any = await tauriDialog.open({ directory: true });
    setDirName(dir);
    const readDir: any[] = await tauriFs.readDir(dir, { recursive: true } as any);
    console.log('read');
    setFiles([
      ...readDir
    ] as any);
  }
  return (
    <div className="App">
      <GridContainer alignItems="center" direction="column">
        <div>
          <Button type="button" onClick={onClick}>Select Directory</Button>
        </div>
        <GridItem xs={8}>
          <Table columns={columns} rows={rows}/>
        </GridItem>
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
