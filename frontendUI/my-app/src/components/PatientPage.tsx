"use client";

import React, { useState, useEffect } from 'react';
import PatientTable from './PatientTable';
import { Card, CardContent, Typography } from '@mui/material';

const PatientPage: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch patient data from API based on search term
  const fetchPatientData = async (searchTerm: string) => {
    setLoading(true);
    try {
      const endpoint = `/api/v1/patient/${searchTerm}`;
      console.log('Fetching from PatientPage:', endpoint);
      console.log('Searching patient with term:', searchTerm);
      const response = await fetch(`/api/v1/patient/${searchTerm}`);
      console.log(response);
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

  // Function to format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Callback function passed to AppBarComponent to handle search
  const handleSearchPatient = (term: string) => {
    fetchPatientData(term);
  };

  return (
    <div style={{ 
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',  // Defines three rows: auto (patient info), 1fr (table row), auto (empty)
      gridTemplateColumns: '1fr',        // Single column layout for the entire content
      height: '80vh',                    // Set the height of the grid container
      paddingLeft: '20px',               // Padding left for content alignment
      paddingRight: '20px',              // Padding right for content alignment
      paddingTop: '20px',                // Padding top for content alignment
      gap: '20px'                        // Gap between grid items
    }}>
      {/* Patient Info Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr',   // Two columns: first column occupies 1/3 and second column occupies 2/3 of the row
        gap: '20px',                      // Gap between columns
        marginBottom: '20px'              // Margin bottom for spacing
      }}>
        {/* Patient Information Card */}
        {loading && <p>Loading patient information...</p>}
        {error && <p>{error}</p>}
        {patientInfo && (
          <Card style={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom> Patient Information </Typography>
              <Typography><strong>Name:</strong> {patientInfo.name}</Typography>
              <Typography><strong>Age:</strong> {patientInfo.age}</Typography>
              <Typography><strong>Gender:</strong> {patientInfo.gender}</Typography>
              <Typography><strong>ICU Length of Stay:</strong> {patientInfo.icuLengthOfStay}</Typography>
              <Typography><strong>In Time:</strong> {formatDate(patientInfo.intime)}</Typography>
              <Typography><strong>Out Time:</strong> {formatDate(patientInfo.outtime)}</Typography>
            </CardContent>
          </Card>
        )}

        {/* Placeholder for future content */}
        <div></div>
      </div>

      {/* Table row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',       // Single column for the tables
        gap: '20px',                      // Gap between columns
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
