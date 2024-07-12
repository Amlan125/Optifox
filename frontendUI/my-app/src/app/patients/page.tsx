import React from 'react';
import PatientDetail from '@/components/PatientDetail';

async function fetchPatients() {
  const res = await fetch(
    `http://0.0.0.0:3000/api/v1/current-patients/2131-01-11%2004:20:05`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

const PatientsPage = async () => {
  const patients = await fetchPatients();

  return (
    <div>
      <div className="relative overflow-x-auto">
        <PatientDetail patients={patients} />
      </div>
    </div>
  );
};

export default PatientsPage;