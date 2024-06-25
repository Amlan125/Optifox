import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const SearchPatient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const { isDarkMode } = useThemeContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      console.log('Searching...', searchTerm);
      const response = await fetch(`http://127.0.0.1:8000/api/v1/patient/${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPatientInfo(data);
    } catch (error) {
      console.error('Error searching patient:', error);
      alert('Error fetching patient details');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          type="text"
          label="Enter Patient ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ backgroundColor: isDarkMode ? '#ffffff' : '#000000', color: isDarkMode ? '#000000' : '#ffffff' }}
        >
          Search
        </Button>
      </div>
      {patientInfo && (
        <div>
          <p>Age: {patientInfo.age}</p>
          <p>Gender: {patientInfo.gender}</p>
          <p>ICU Length of Stay: {patientInfo.los_hour_int} hours</p>
          <p>In Time: {new Date(patientInfo.intime).toLocaleDateString()}</p>
          <p>Out Time: {new Date(patientInfo.outtime).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
