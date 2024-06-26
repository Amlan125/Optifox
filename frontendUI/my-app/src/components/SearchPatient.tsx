import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface SearchPatientProps {
  onSearch: (data: any) => void; // Callback function to handle search and receive patient data
  isDarkMode: boolean; // Flag for dark mode
}

const SearchPatient: React.FC<SearchPatientProps> = ({ onSearch, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to hold search term
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to hold error message

  // Function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update searchTerm with new value
  };

  // Function to fetch patient data from API based on search term
  const fetchPatientData = async () => {
    setLoading(true); // Set loading state to true
    try {
      if (!searchTerm.trim()) {
        console.warn('Search term is empty');
        return;
      }
      console.log(`Search term: ${searchTerm}`);
      const endpoint = `http://127.0.0.1:3000/api/v1/patient/${searchTerm}`;
      console.log('Fetching from SearchPatient:', endpoint);
      const response = await fetch(endpoint);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      onSearch(data); // Call the callback function to pass fetched data to parent component
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          type="text"
          label="Enter Stay ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          onClick={fetchPatientData} // Call fetchPatientData when search button is clicked
          style={{ backgroundColor: isDarkMode ? '#ffffff' : '#000000', color: isDarkMode ? '#000000' : '#ffffff' }}
        >
          Search
        </Button>
      </div>
      {loading && <p>Loading patient information...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchPatient;
