import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface PatientTableProps {
  readmissionLikelihood: boolean; // Readmission likelihood to display
}

const Readmissiondata = [
  { date: '03/06/2024', readmissionLikelihood: false },
  { date: '02/06/2024', readmissionLikelihood: true },
  { date: '01/06/2024', readmissionLikelihood: false },
];

const MortalityData = [
  { date: '03/06/2024', mortalityLikelihood: true },
  { date: '02/06/2024', mortalityLikelihood: true },
  { date: '01/06/2024', mortalityLikelihood: false },
];

const PatientTable: React.FC<PatientTableProps> = ({ readmissionLikelihood }) => {
  // Update only the first row of Readmissiondata based on readmission likelihood
  const updatedReadmissionData = Readmissiondata.map((item, index) => ({
    ...item,
    readmissionLikelihood: index === 0 ? readmissionLikelihood : item.readmissionLikelihood, // Update only the first row
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Readmission Table */}
      <TableContainer component={Paper} style={{ width: '45%', marginTop: '20px', marginRight: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-sans font-medium text-xl">Date</TableCell>
              <TableCell className="font-sans font-medium text-xl">Readmission Likelihood</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedReadmissionData.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: row.readmissionLikelihood ? 'red' : 'green' }}>
                <TableCell style={{ fontSize: '1rem' }}>{row.date}</TableCell>
                <TableCell style={{ fontSize: '1rem' }}>{row.readmissionLikelihood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mortality Table */}
      <TableContainer component={Paper} style={{ width: '45%', marginTop: '20px', marginRight: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-sans font-medium text-xl">Date</TableCell>
              <TableCell className="font-sans font-medium text-xl">Mortality Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MortalityData.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: row.mortalityLikelihood ? 'red' : 'green' }}>
                <TableCell style={{ fontSize: '1rem' }}>{row.date}</TableCell>
                <TableCell style={{ fontSize: '1rem' }}>{row.mortalityLikelihood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientTable;
