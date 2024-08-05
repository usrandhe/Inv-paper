// pages/index.js
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function HerizontalMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AMS
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Item Group</MenuItem>
            <MenuItem onClick={handleClose}>Item Master</MenuItem>
            <MenuItem onClick={handleClose}>Party Master</MenuItem>
            <MenuItem onClick={handleClose}>Account Group</MenuItem>
            <MenuItem onClick={handleClose}>Account Master</MenuItem>
            <MenuItem onClick={handleClose}>Lookup Master</MenuItem>
            <MenuItem onClick={handleClose}>With Holding Master</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Typography paragraph>
          This is a responsive top menu example using Material UI in Next.js.
        </Typography>
      </Box>
    </Box>
  );
}
