
import React, { useState, useEffect } from "react";

import "../../utilities.css";
import { useLocation } from 'react-router-dom';

import { TextField, Button, Typography, Box } from "@mui/material";

import { get } from "../../utilities.js";

import { useNavigate } from 'react-router-dom';

const ConnectPage = () => {
  // Get url
  const navigate = useNavigate();

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
                "topic":"A peaceful Minecraft song for sleeping with no vocals",
                "tags": "ambient, instrumental"
              }).then((res) => {
                const intervalId = setInterval(() => {
                  get("/api/getSong", 
                    {
                      "id": res.id
                    }).then((res) => {
                      console.log("GET SONG");
                      console.log(res); 
                      console.log(res[0].status);
                      if (res[0].status =="error" || res[0].status == "complete") {
                        console.log("BREAK");
                        clearInterval(intervalId);
                        if (res[0].status == "complete") {
                          navigate('/shleep', {
                            state: { song: res[0].audio_url}
                          });
                        }
                      }
                    });
                }, 30000);
              })
        });
      }}> 
      Request Data
    </button>
    </div>
  )
};

export default ConnectPage;
