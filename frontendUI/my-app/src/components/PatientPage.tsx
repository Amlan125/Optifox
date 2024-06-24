
// PatientPage.tsx

"use client";

import React from 'react';
import AppBarComponent from './AppBarComponent';
import PatientTable from './PatientTable';

const PatientPage: React.FC = () => {
  return (
    <div>
      <AppBarComponent />
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', height: '80vh', paddingLeft: '10px', paddingTop: '20px' }}>
        <PatientTable />
      </div>
      {/* Add your patient page content here */}
    </div>
  );
};

export default PatientPage;


// </div><div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '80vh' }}></div>