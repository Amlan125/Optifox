import { notFound } from "next/navigation";
import PatientPage from "../../../components/PatientPage";
async function fetchPatient(id: any) {
  const res = await fetch(`http://0.0.0.0:3000/api/v1/patient/${id}`);
  const data = await res.json();
  return data;
}
export default async function SinglePatientPage({ params }: any) {
  const patient: any = await fetchPatient(params.stayId);
  if (!patient) {
    notFound();
  }
  return (
    <div>
      <PatientPage data={patient} />
    </div>
  );
} 