"use client";

import React, { useState } from 'react';
import PatientTable from './PatientTable';
import { Card, CardContent, Typography } from '@mui/material';
import SearchPatient from './SearchPatient'; // Import the SearchPatient component

const PatientPage: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<any>(null); // State to hold patient info
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state

  // Function to fetch patient data from API based on search term
  const fetchPatientData = async (searchTerm: string) => {
    setLoading(true);
    try {
      const endpoint = `/api/v1/patient/${searchTerm}`;
      console.log('Fetching from PatietPage:', endpoint);
      console.log('Searching patient with term:', searchTerm);
      const response = await fetch(endpoint);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setPatientInfo({ ...data, searchTerm }); // Update patientInfo state with fetched data and search term
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to display JSON object as formatted text
  const renderJSON = (data: any) => {
    return (
      <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',  // Define grid template rows
      gridTemplateColumns: '1fr',        // Define grid template columns
      height: '80vh',                    // Set height of the grid container
      paddingLeft: '20px',               // Set left padding for content alignment
      paddingRight: '20px',              // Set right padding for content alignment
      paddingTop: '20px',                // Set top padding for content alignment
      gap: '20px'                        // Set gap between grid items
    }}>
      {/* Search Patient Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',       // Define grid template columns
        gap: '20px',                      // Set gap between columns
        marginBottom: '20px'              // Set bottom margin for spacing
      }}>
        <SearchPatient onSearch={fetchPatientData} isDarkMode={false} /> {/* Add the SearchPatient component */}
      </div>

      {/* Patient Info Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',       // Define grid template columns
        gap: '20px',                      // Set gap between columns
        marginBottom: '20px'              // Set bottom margin for spacing
      }}>
        {/* Print patientInfo for debugging */}
        {patientInfo && renderJSON(patientInfo)}
        
        {/* Patient Information Card */}
        {patientInfo && (
          <Card style={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom> Patient Information </Typography>
              <Typography><strong>Search Term:</strong> {patientInfo.searchTerm}</Typography>
              <Typography><strong>Name:</strong> {patientInfo.name}</Typography>
              <Typography><strong>Age:</strong> {patientInfo.age}</Typography>
              <Typography><strong>Gender:</strong> {patientInfo.gender}</Typography>
              <Typography><strong>ICU Length of Stay:</strong> {patientInfo.icuLengthOfStay}</Typography>
              <Typography><strong>In Time:</strong> {formatDate(patientInfo.intime)}</Typography>
              <Typography><strong>Out Time:</strong> {formatDate(patientInfo.outtime)}</Typography>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Table row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',       // Define grid template columns
        gap: '20px',                      // Set gap between columns
        justifyContent: 'center'          // Center content horizontally
      }}>
        <div style={{ width: '100%', maxWidth: 'calc(100% - 40px)' }}>
          <PatientTable />
        </div>
      </div>

      {/* Empty row */}
      <div style={{ visibility: 'hidden' }}></div>
    </div>
  );
};

export default PatientPage;
