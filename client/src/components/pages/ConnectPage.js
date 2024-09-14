
import React, { useState, useEffect } from "react";

import "../../utilities.css";
import { useLocation } from 'react-router-dom';

import { TextField, Button, Typography, Box } from "@mui/material";

import { get } from "../../utilities.js";
const ConnectPage = () => {
  // Get url
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const user_id = queryParams.get('user_id');

  return (
    <div>
      <button
      onClick={() => {
        // get data
        get("/api/getData", {"user_id": user_id}).then((res) => {
          console.log(res);
          // process data, get parameters for generation
          get("/api/requestSong", 
              {
                "topic":"A song about water bottles",
                "tags": "pop"
              }).then((res) => {
                console.log(res);
                get("/api/getSong", 
                  {
                    "id": res.id
                  }).then((res) => {
                    console.log("GET SONG");
                    console.log(res);
                  })
              })
        });
      }}
    > 
      Request Data
    </button>
    </div>
  )
};

export default ConnectPage;
