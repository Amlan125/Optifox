import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Readmissiondata = [
  { date: '03/06/2024', readmissionLikelihood: true },
  { date: '02/06/2024', readmissionLikelihood: true },
  { date: '01/06/2024', readmissionLikelihood: false },
];

const MortalityData = [
  { date: '03/06/2024', mortalityLikelihood: true },
  { date: '02/06/2024', mortalityLikelihood: true },
  { date: '01/06/2024', mortalityLikelihood: false },
];

const PatientTable: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Readmission Table */}
      <TableContainer component={Paper} style={{ width: '45%', marginTop: '20px' }}>
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

      {/* Mortality Table */}
      <TableContainer component={Paper} style={{ width: '45%', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Mortality Likelihood</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MortalityData.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: row.mortalityLikelihood ? 'red' : 'green' }}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.mortalityLikelihood.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientTable;
