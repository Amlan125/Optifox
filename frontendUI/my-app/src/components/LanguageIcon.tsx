
import React from 'react';
import { IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageIconComponent: React.FC = () => {
  
  const handleLanguageChange = () => {
    
  };

  return (
    <IconButton color="inherit" onClick={handleLanguageChange}>
      <LanguageIcon />
    </IconButton>
  );
};

export default LanguageIconComponent;
