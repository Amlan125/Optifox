"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import LanguageIcon from './LanguageIcon';
import { useThemeContext } from '../context/ThemeContext';
// import SearchPatient from './SearchPatient';

interface AppBarComponentProps {
  onSearchPatient: (term: string) => void;  // Callback function to handle search term
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ onSearchPatient }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const { isDarkMode } = useThemeContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

 
  const appBarBackgroundColor = isDarkMode ? '#121212' : '#03acab';

  return (
    <AppBar position="static" style={{ backgroundColor: appBarBackgroundColor }}>
      <Toolbar>
        <Typography variant="h6"  style={{ cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#121212',
          fontFamily: 'Menlo, sans-serif', }}>
          OptiFox
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <LanguageIcon />
        <ThemeToggle />
        {/* Pass the searchPatient function as a prop to SearchPatient */}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
