// node_modules
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export function NavBar() {
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