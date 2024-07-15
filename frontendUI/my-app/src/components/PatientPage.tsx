"use client";

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import ReadmissionStatus from './Predictions';
import PatientTable from './PatientTable';

interface PatientInfo {
  stay_id: string;
  name: string;
  age: number;
  gender: string;
  los_hour_int: number;
  intime: string;
  outtime: string;
  will_be_readmitted: boolean;
}

const PatientPage: React.FC<{ data: PatientInfo }> = ({ data }) => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/patients/${query}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  const formatICUStay = (hours: number) => {
    console.log(data);
    return hours.toFixed(2);
  };

  const confidences = [0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.1];

  return (
    <div
      style={{
        position: 'relative',
        height: '80vh',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        gap: '20px',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* Readmission status component */}
      <div style={{ gridColumn: '1 / span 1', paddingTop: '50px' }}>
        <ReadmissionStatus will_be_readmitted={data.will_be_readmitted} mortality_rate={14} />
      </div>

      {/* Card displaying 'Past 6 days data' in 2nd row, 1st column */}
      <div style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1' }}>
        <Card style={{ height: '68%', width: 'auto' }}>
          <CardContent>
            <Typography variant="h6">Past 6 days data</Typography>
            {data && (
              <PatientTable
                readmissionLikelihood={data.will_be_readmitted}
                lengthOfStay={data.los_hour_int}
                stayId={data.stay_id}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Certainty score graph in 1st row, 2nd column 
      <div style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }}>
        {data && (
          <CertaintyCurve confidences={confidences} />
        )}
      </div>*/}

      {/* Patient information in 2nd row, 2nd column */}
      <div style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1', paddingTop: '70px' }}>
        {data && (
          <Card style={{ height: 'auto', width: '65%'  }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Patient Information
              </Typography>
              <Typography>
                <strong>Stay ID:</strong> {data.stay_id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {data.name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {data.age}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {data.gender}
              </Typography>
              <Typography>
                <strong>ICU Length of Stay:</strong>{' '}
                {formatICUStay(data.los_hour_int)} hours
              </Typography>
              <Typography>
                <strong>In Time:</strong> {formatDate(data.intime)}
              </Typography>
              <Typography>
                <strong>Out Time:</strong> {formatDate(data.outtime)}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 999,
          width: '100%',
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default PatientPage;
