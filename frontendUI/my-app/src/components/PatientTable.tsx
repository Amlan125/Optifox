import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';

const Readmissiondata = [
  { date: '03/06/2024', readmissionLikelihood: true },
  { date: '02/06/2024', readmissionLikelihood: true },
  { date: '01/06/2024', readmissionLikelihood: false },
];

const Mortalitydata = [
  { date: '03/06/2024', mortalityLikelihood: true },
  { date: '02/06/2024', mortalityLikelihood: true },
  { date: '01/06/2024', mortalityLikelihood: false },
];

const PatientTable: React.FC = () => {
  return (
    <Grid container spacing={5} justifyContent="center">
      <Grid item xs={6}>
        <TableContainer component={Paper} style={{ width: '70%', margin: '20px auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Readmission Likelihood</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Readmissiondata.map((row, index) => (
                <TableRow key={index} style={{ backgroundColor: row.readmissionLikelihood ? 'red' : 'green' }}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.readmissionLikelihood.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={6}>
        <TableContainer component={Paper} style={{ width: '70%', margin: '20px auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Mortality Likelihood</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Mortalitydata.map((row, index) => (
                <TableRow key={index} style={{ backgroundColor: row.mortalityLikelihood ? 'red' : 'green' }}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.mortalityLikelihood.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PatientTable;
