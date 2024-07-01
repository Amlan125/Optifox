import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import PatientTable from './PatientTable';

interface SearchPatientProps {
  onSearch: (data: any, willBeReadmitted: boolean) => void; // Callback function to handle search and receive patient data and readmission likelihood
  isDarkMode: boolean; // Flag for dark mode
}

const SearchPatient: React.FC<SearchPatientProps> = ({ onSearch, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to hold search term
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const [data, setData] = useState<any>(null); // State to hold fetched data

  // Function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update searchTerm with new value
  };

  // Function to fetch patient data from API based on search term
  const fetchPatientData = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state
    try {
      if (!searchTerm.trim()) {
        console.warn('Search term is empty');
        setLoading(false);
        setError('Search term cannot be empty');
        return;
      }
      console.log(`Search term: ${searchTerm}`);
      //const endpoint = `/api/v1/patient/${searchTerm}`;
      //console.log('Fetching from SearchPatient:', endpoint);
      const response = await fetch( `http://0.0.0.0:3000/api/v1/patient/${searchTerm}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setData(data); // Set fetched data to state
      onSearch(data, data.will_be_readmitted);
      console.log(data.will_be_readmitted); // Pass fetched data and readmission likelihood to parent component
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
      setLoading(false); // Set loading state to false
    }
  };

  // Function to format date string to a readable format including time
  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
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
          style={{ backgroundColor: isDarkMode ? '#ffffff' : '#007BA7', color: isDarkMode ? '#000000' : '#ffffff' }}
        >
          Search
        </Button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}
      >
        {loading && <p>Loading patient information...</p>}
        {error && <p>{error}</p>}
        {data && (
          <>
            <Card style={{ gridRow: '1', gridColumn: '1', width : '90%', }}>
              <CardContent>
                <Typography  className="font-sans font-medium text-l">Name: {data.name}</Typography>
                <Typography  className="font-sans font-medium text-l">Age: {data.age}</Typography>
                <Typography  className="font-sans font-medium text-l">Gender: {data.gender}</Typography>
                <Typography  className="font-sans font-medium text-l">Length of Stay: {data.los_hour_int}</Typography>
                <Typography  className="font-sans font-medium text-l">In Time: {formatDateTime(data.intime)}</Typography>
                <Typography  className="font-sans font-medium text-l">Out Time: {formatDateTime(data.outtime)}</Typography>
              </CardContent>
            </Card>
            <div style={{ gridRow: '2 / 3', gridColumn: '1 / 3' }}>
              <PatientTable readmissionLikelihood={data.will_be_readmitted} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;
