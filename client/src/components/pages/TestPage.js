
import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { useNavigate } from 'react-router-dom';

import { TextField, Button, Typography, Box } from "@mui/material";

import { get } from "../../utilities.js";
const TestPage = () => {
  const navigate = useNavigate();
  const [referenceName, setReferenceName] = useState("");

  // useEffect(() => {
  //   get("/api/requestSong").then((res) => {
  //     console.log(res);
  //   });
  // });

  return (
    <div>
      <TextField 
        label="Reference Name" 
        variant="outlined" 
        value={referenceName}
        onChange={(e) => setReferenceName(e.target.value)}
        color="primary">
      Hello World
    </TextField>
      <h1>HI TEST</h1>
      <p>Test.</p>
      <button
      onClick={() => {
        get("/api/generateWidgetSession", {reference: referenceName}).then((res) => {
          window.location.href = res.url;

        });
      }}
    > 
      Generate Widget Session
    </button>
    <button
      onClick={() => {
        navigate('/shleep', {
          state: { song: "https://cdn1.suno.ai/d32646c9-a462-4b2c-a81b-61b54489efad.mp3"}
        });
      }}
    > 
      Request Data
    </button>
    <button
      onClick={() => {
        get("/api/requestSong").then((res) => {
          console.log(res);
        });
      }}
    > 
    Request Song
    </button>
    <button
      onClick={() => {
        get("/api/getSong").then((res) => {
          console.log(res);
        });
      }}
    > 
    Get Song
    </button>
    </div>
  );
};

export default TestPage;
