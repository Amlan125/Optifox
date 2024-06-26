import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

interface SearchPatientProps {
  onSearch: (searchTerm: string) => void; // Callback function to handle search
  isDarkMode: boolean; // Flag for dark mode
}

const SearchPatient: React.FC<SearchPatientProps> = ({ onSearch, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toString();
    setSearchTerm(value); // Update searchTerm with the new value
    console.log(value); // Log the current input value
    console.log(`Search term in SearchPatient:`, value); // Log the updated searchTerm directly
  };
  

  // Function to fetch patient data from API based on search term
  const fetchPatientData = async (searchTerm: string) => {
    setLoading(true);
    try {
      if (typeof searchTerm !== 'string') {
        console.warn('searchTerm is not a string:', searchTerm);
        return;
      }
      console.log(`Search term: ${searchTerm}`);
      const endpoint = `http://127.0.0.1:3000/api/v1/patient/${searchTerm}`;
      console.log('Fetching from SeachPatient:', endpoint);
      const response = await fetch(`http://127.0.0.1:3000/api/v1/patient/${searchTerm}`);
      //const response = await fetch(`http://127.0.0.1:3000/api/v1/patient/39880770`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Here 1',data);
      setPatientInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
      setLoading(false);
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
  onClick={() => fetchPatientData(searchTerm)} // Pass searchTerm to fetchPatientData
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
