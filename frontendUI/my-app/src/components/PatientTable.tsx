import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

interface PatientTableProps {
  readmissionLikelihood: boolean | number; // Updated to accept boolean or number (0 or 10)
  lengthOfStay: number;
  stayId: string;
}

const MortalityData = [
  { date: '03/06/2024', mortalityLikelihood: 4 },
  { date: '02/06/2024', mortalityLikelihood: 6 },
  { date: '01/06/2024', mortalityLikelihood: 8 },
  { date: '01/06/2024', mortalityLikelihood: 7 },
  { date: '01/06/2024', mortalityLikelihood: 2 },
  { date: '01/06/2024', mortalityLikelihood: 1 },
];

const PatientTable: React.FC<PatientTableProps> = ({ readmissionLikelihood, lengthOfStay, stayId }) => {
  const [readmissionData, setReadmissionData] = useState<{ date: string; readmissionLikelihood: number }[]>([]);

  useEffect(() => {
    // Generate new random readmission likelihoods when stayId changes
    const newReadmissionData = Array.from({ length: 6 }, (_, index) => ({
      date: subtractDays(index),
      readmissionLikelihood: Math.floor(Math.random() * 11),
    }));
    setReadmissionData(newReadmissionData);
  }, [stayId]);

  const subtractDays = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Function to determine color based on likelihood (0 to 10 mapping)
  const getColor = (likelihood: boolean | number) => {
    let value = 0;
    if (typeof likelihood === 'boolean') {
      value = likelihood ? 10 : 0;
    } else {
      value = likelihood;
    }

    // Calculate RGB values based on value (0 to 10 gradient)
    const colorValue = Math.round((value / 10) * 255); // Scale value to 0-255 for RGB
    const red = colorValue;
    const green = 255 - colorValue;
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ marginTop: '20px', padding: '10px', backgroundColor:'#E4D1CE' }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '10px', color: '#333333' }}>
            Readmission Likelihood
          </Typography>
          <Grid container spacing={4}>
            {readmissionData.map((row, index) => (
              <Grid key={index} item xs={1} style={{ textAlign: 'center', flex: '1 0 auto' }}>
                <div
                  style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: getColor(row.readmissionLikelihood),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {/*{row.readmissionLikelihood}*/}
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ marginTop: '20px', padding: '10px', backgroundColor:'#E4D1CE'  }}>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '10px', color: '#333333' }}>
            Mortality Rate
          </Typography>
          <Grid container spacing={4}>
            {MortalityData.map((row, index) => (
              <Grid key={index} item xs={1} style={{ textAlign: 'center', flex: '1 0 auto' }}>
                <div
                  style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: getColor(row.mortalityLikelihood),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {/*{row.mortalityLikelihood}*/}
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PatientTable;
