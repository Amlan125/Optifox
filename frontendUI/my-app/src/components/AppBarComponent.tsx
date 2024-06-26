"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import LanguageIcon from './LanguageIcon';
import { useThemeContext } from '../context/ThemeContext';
import SearchPatient from './SearchPatient';

interface AppBarComponentProps {
  onSearchPatient: (term: string) => void;  // Callback function to handle search term
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ onSearchPatient }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const { isDarkMode } = useThemeContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   // Function to fetch patient data from API based on search term
   const fetchPatientData = async (searchTerm: string) => {
    setLoading(true);
    try {

      const endpoint = `/api/v1/patient/${searchTerm}`;
      console.log('Fetching from AppBar:', endpoint);
      console.log('Searching patient with term:', searchTerm);
      const response = await fetch(`/api/v1/patient/${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPatientInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
      setLoading(false);
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
        {/* Pass the searchPatient function as a prop to SearchPatient */}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
