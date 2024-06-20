"use client";

import React from 'react';
import AppBarComponent from './AppBarComponent';
import ReadmissionComponent from './readmission_rate';
import MortalityRate from './mortality_rate';
import { useThemeContext } from '../context/ThemeContext';

const PatientPage: React.FC = () => {
  const { isDarkMode } = useThemeContext(); // Fetch isDarkMode from context or state

  const readmissionData = [
    { date: '03/06/2024', readmissionLikelihood: 16 },
    { date: '02/06/2024', readmissionLikelihood: 15 },
    { date: '01/06/2024', readmissionLikelihood: 9 },
  ];

  const mortalityData = [
    { date: '03/06/2024', mortalityRate: 8 },
    { date: '02/06/2024', mortalityRate: 11 },
    { date: '01/06/2024', mortalityRate: 10 },
  ];

  return (
    <div>
      <main className={isDarkMode ? 'bg-blue-950' : 'bg-blue-200'} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto repeat(4, 1fr)', gap: '10px' }}>
        <div style={{ gridColumn: '1 / 5', gridRow: '1' }}>
          <AppBarComponent />
        </div>
        <div style={{ gridColumn: '1 / 3', gridRow: '2 / 4' }}></div>
        <div style={{ gridColumn: '3 / 5', gridRow: '2 / 4' }}></div>

        <div style={{ gridColumn: '1 / 2', gridRow: '4 / 6' }}>
          <ReadmissionComponent data={readmissionData} isDarkMode={isDarkMode} />
        </div>

        <div style={{ gridColumn: '2 / 3', gridRow: '4 / 6' }}>
          <MortalityRate data={mortalityData} />
        </div>

        <div style={{ gridColumn: '3 / 5', gridRow: '4 / 6' }}></div>
      </main>
    </div>
  );
};

export default PatientPage;
