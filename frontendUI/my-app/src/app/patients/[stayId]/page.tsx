// This file defines a next.js component for displaying a single patient's details.

import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Layout from '../../layout';
import PatientPage from '../../../components/PatientPage';




async function fetchPatient(id: any) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/patient/${id}`);
  const data = await res.json();
  return data;
}

export default async function SinglePatientPage({ params }: any) {
  const patient = await fetchPatient(params.stayId);
  console.log(patient);

  if (!patient) {
    notFound();
  }

  return (
    <div>
      <h1>{`Stay id: ${patient.stay_id}`}</h1>
        <Layout>
          <PatientPage />
        </Layout>
    </div>
  );
}
