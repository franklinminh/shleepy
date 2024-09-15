import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Switch, FormControlLabel, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { get } from "../../utilities.js";
import "./Preferences.css";
import StarsImage from "../modules/Stars.svg";

const Preferences = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const user_id = queryParams.get('user_id');
  const [switches, setSwitches] = useState({
    stress: false,
    anxiety: false,
    fatigue: false,
  });

  const handleSwitchChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

  return (
    <div className="background-purple">
      <div
        className="sky-landing-page-flex"
        style={{
          backgroundImage: `url(${StarsImage})`,
          backgroundSize: `auto 100%`,
          backgroundPosition: "top center",
          backgroundRepeat: "repeat-x",
        }}
      >
        <h1 className="u-fontMontserrat u-fontSemibold u-textWhite">
          what have you been
          <br /> experiencing lately?
        </h1>

        {/* Switches in Column */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={switches.stress}
                onChange={handleSwitchChange}
                name="stress"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "var(--yellow)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--yellow)",
                  },
                }}
              />
            }
            label="Stress"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: switches.stress ? "var(--yellow)" : "white",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={switches.anxiety}
                onChange={handleSwitchChange}
                name="anxiety"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "var(--yellow)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--yellow)",
                  },
                }}
              />
            }
            label="Anxiety"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: switches.anxiety ? "var(--yellow)" : "white",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={switches.fatigue}
                onChange={handleSwitchChange}
                name="fatigue"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "var(--yellow)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--yellow)",
                  },
                }}
              />
            }
            label="Fatigue"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: switches.fatigue ? "var(--yellow)" : "white",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            backgroundColor: "white",
            color: "var(--purple)",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          onClick={() => {
            // get data
            get("/api/getData", {"user_id": user_id}).then((res) => {
              console.log(res);
              // TODO: process data, get parameters for generation. also use switches state
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
          Start Shleeping
        </Button>
      </div>
    </div>
  );
};

export default Preferences;
