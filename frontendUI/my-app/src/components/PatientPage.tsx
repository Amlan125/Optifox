"use client";
import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import PatientTable from "./PatientTable";

interface PatientInfo {
  stay_id: string;
  name: string;
  age: number;
  gender: string;
  los_hour_int: number;
  intime: string;
  outtime: string;
  will_be_readmitted: boolean; // Add this property
}

const PatientPage: React.FC<{ data: PatientInfo }> = (props) => {
  const { data } = props;
  const router = useRouter();

  // Handle search result
  const handleSearch = (query: string) => {
    router.push(`/patients/${query}`);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "80vh",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        gap: "20px",
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          gridRow: "1 / span 1",
          gridColumn: "1 / span 2",
          width: "100%",
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Patient Information Card */}
      <div
        style={{
          gridRow: "2 / span 1",
          gridColumn: "1 / span 1",
          width: "90%",
          height: "100%",
        }}
      >
        {data && (
          <Card style={{ width: "100%", height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Patient Information
              </Typography>
              <Typography>
                <strong>Search Term:</strong> {data.stay_id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {data.name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {data.age}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {data.gender}
              </Typography>
              <Typography>
                <strong>ICU Length of Stay:</strong> {data.los_hour_int}
              </Typography>
              <Typography>
                <strong>In Time:</strong> {formatDate(data.intime)}
              </Typography>
              <Typography>
                <strong>Out Time:</strong> {formatDate(data.outtime)}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Patient Table */}
      <div
        style={{
          gridRow: "3 / span 1",
          gridColumn: "1 / span 2",
        }}
      >
        <PatientTable readmissionLikelihood={data.will_be_readmitted} />
      </div>
    </div>
  );
};

export default PatientPage;
