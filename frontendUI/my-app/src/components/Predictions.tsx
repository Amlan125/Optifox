import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface ReadmissionStatusProps {
  will_be_readmitted: boolean;
  mortality_rate: number;
}

const ReadmissionStatus: React.FC<ReadmissionStatusProps> = ({ will_be_readmitted, mortality_rate }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ height: '200px', marginTop: '20px', padding: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
            Readmission Status
          </Typography>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <div
              style={{
                width: '100%',
                height: '65%', // Adjusted height here
                backgroundColor: will_be_readmitted ? '#FF6B6B' : '#4CAF50',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '24px',
                padding: '20px',
                boxSizing: 'border-box',
              }}
            >
              {will_be_readmitted ? 'Readmitted' : 'Not Readmitted'}
            </div>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ height: '200px', marginTop: '20px', padding: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
            Mortality Rate
          </Typography>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <div
              style={{
                width: '100%',
                height: '65%', // Adjusted height here
                backgroundColor: mortality_rate > 10 ? '#FF6B6B' : '#4CAF50',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '24px',
                padding: '20px',
                boxSizing: 'border-box',
              }}
            >
              {mortality_rate}
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReadmissionStatus;
