"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import LanguageIcon from './LanguageIcon';
import { useThemeContext } from '../context/ThemeContext';
import SearchPatient from './SearchPatient';

const AppBarComponent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const { isDarkMode } = useThemeContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchPatient = async (term: string) => {
    try {
      console.log('Searching...', term);
      const response = await fetch(`/api/v1/patient/${term}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPatientInfo(data);
      handleClose();
    } catch (error) {
      console.error('Error searching patient:', error);
      alert('Error fetching patient details');
    }
  };

  const appBarBackgroundColor = isDarkMode ? '#121212' : '#03acab';

  return (
    <AppBar position="static" style={{ backgroundColor: appBarBackgroundColor }}>
      <Toolbar>
        <Typography variant="h6" onClick={handleMenu} style={{ cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#121212' }}>
          Stay ID
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
          style={{
            backgroundColor: 'transparent',
            marginTop: '32px',
          }}
        >
          {patientInfo && (
            <>
              <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Age: {patientInfo.age}</MenuItem>
              <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Gender: {patientInfo.gender}</MenuItem>
              <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>ICU Length of Stay: {patientInfo.los_hour_int} hours</MenuItem>
              <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>In Time: {new Date(patientInfo.intime).toLocaleDateString()}</MenuItem>
              <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Out Time: {new Date(patientInfo.outtime).toLocaleDateString()}</MenuItem>
            </>
          )}
        </Menu>
        <div style={{ flexGrow: 1 }} />
        <LanguageIcon />
        <ThemeToggle />
        <SearchPatient onSearch={searchPatient} isDarkMode={isDarkMode} />
      </Toolbar>
    </AppBar>
    
  );
};

export default AppBarComponent;
