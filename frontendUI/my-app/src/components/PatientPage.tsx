"use client";
import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
const PatientPage = (props: any) => {
  const [patientInfo, setPatientInfo] = useState(props.data); // State to hold patient info
  const router = useRouter();
  // Handle search result
  const handleSearch = (query: string) => {
    router.push(`/patients/${query}`);
  };
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
        display: "grid",
        gridTemplateRows: "auto 1fr auto", // Define grid template rows
        gridTemplateColumns: "1fr", // Define grid template columns
        height: "80vh", // Set height of the grid container
        paddingLeft: "20px", // Set left padding for content alignment
        paddingRight: "20px", // Set right padding for content alignment
        paddingTop: "20px", // Set top padding for content alignment
        gap: "20px", // Set gap between grid items
      }}
    >
      {/* Search Patient Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // Define grid template columns
          gap: "20px", // Set gap between columns
          marginBottom: "20px", // Set bottom margin for spacing
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </div>
      {/* Patient Info Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // Define grid template columns
          gap: "20px", // Set gap between columns
          marginBottom: "20px", // Set bottom margin for spacing
        }}
      >
        {/* Print patientInfo for debugging */}
        {/* {patientInfo && renderJSON(patientInfo)} */}
        {/* Patient Information Card */}
        {patientInfo && (
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {" "}
                Patient Information{" "}
              </Typography>
              <Typography>
                <strong>Search Term:</strong> {patientInfo.stay_id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {patientInfo.name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {patientInfo.age}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {patientInfo.gender}
              </Typography>
              <Typography>
                <strong>ICU Length of Stay:</strong> {patientInfo.los_hour_int}
              </Typography>
              <Typography>
                <strong>In Time:</strong> {formatDate(patientInfo.intime)}
              </Typography>
              <Typography>
                <strong>Out Time:</strong> {formatDate(patientInfo.outtime)}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Table row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // Define grid template columns
          gap: "20px", // Set gap between columns
          justifyContent: "center", // Center content horizontally
        }}
      >
        <div style={{ width: "100%", maxWidth: "calc(100% - 40px)" }}></div>
      </div>
      {/* Empty row */}
      <div style={{ visibility: "hidden" }}></div>
    </div>
  );
};
export default PatientPage;