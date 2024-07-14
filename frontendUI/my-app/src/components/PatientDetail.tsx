"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useThemeContext } from "../context/ThemeContext"; // Correct path confirmed

const getHeaderColorClass = (isDarkMode: boolean): string => {
  return isDarkMode ? "bg-gray-700 text-white" : "bg-blue-200 text-black";
};

const getRowColorClass = (isDarkMode: boolean): string => {
  return isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black";
};

const getBoxColorClass = (willBeReadmitted: boolean): string => {
  return willBeReadmitted ? "bg-green-500" : "bg-red-500";
};

const getAvailableBedsBoxClass = (isDarkMode: boolean): string => {
  return isDarkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-black";
};

const PatientDetail = ({ patients }: any) => {
  const { isDarkMode } = useThemeContext();
  const router = useRouter();
  const availableBeds = 12; // Assuming this is a fixed value for now

  return (
    <div>
      <div className={`mb-4 p-4 rounded-md shadow-md ${getAvailableBedsBoxClass(isDarkMode)}`}>
        <h3 className="text-lg font-bold">Number of available beds: {availableBeds}</h3>
      </div>
      <table className={`w-full text-sm text-left rtl:text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <thead className={`text-xs uppercase ${getHeaderColorClass(isDarkMode)}`}>
          <tr>
            <th scope="col" className="px-6 py-3">
              Stay id
            </th>
            <th scope="col" className="px-6 py-3">
              Subject id
            </th>
            <th scope="col" className="px-6 py-3">
              First Care Unit
            </th>
            <th scope="col" className="px-6 py-3">
              Admission id
            </th>
            <th scope="col" className="px-6 py-3">
              Readmission Status
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient: any) => {
            return (
              <tr
                onClick={() => router.push(`/patients/${patient.stay_id}`)}
                key={patient.stay_id}
                className={`${getRowColorClass(isDarkMode)} border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`}
                style={{ cursor: "pointer" }}
              >
                <td
                  scope="row"
                  className={`px-6 py-4 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} whitespace-nowrap`}
                >
                  {patient.stay_id}
                </td>
                <td className="px-6 py-4">{patient.subject_id}</td>
                <td className="px-6 py-4">{patient.first_care_unit}</td>
                <td className="px-6 py-4">{patient.hadm_id}</td>
                <td className="px-6 py-4">
                  <div className={`w-4 h-4 ${getBoxColorClass(patient.will_be_readmitted)} rounded-full`}></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetail;