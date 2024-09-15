import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Switch, FormControlLabel, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { get } from "../../utilities.js";
import "./Preferences.css";
import StarsImage from "../modules/Stars.svg";

const Preferences = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [userSound, setUserSound] = useState("");
  const user_id = queryParams.get("user_id");
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
              marginBottom: "0px",
            }}
          />
        </Box>
        <TextField
          label={<span>(optional) how do you want your music to sound?</span>}
          variant="outlined"
          value={userSound}
          onChange={(e) => setUserSound(e.target.value)}
          color="primary"
          sx={{
            marginBottom: "40px",
            marginTop: "0px",
            width: "auto", // Auto width to fit content
            minWidth: "380px", // Optional: Set a minimum width for the input field
            // Default label color to white
            "& .MuiInputLabel-root": {
              color: "white",
            },
            // Label color changes to yellow when focused
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--yellow)", // Assuming var(--yellow) is defined in your CSS
            },
            // Default border color to white
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            // Border color changes to yellow when focused
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--yellow)",
            },
            // Change the input text color to white
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />

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
            console.log("usersound here", userSound);
            navigate("/loading", {
              state: { user_id: user_id, user_sound: userSound },
            });
          }}
        >
          Start Shleeping
        </Button>
      </div>
    </div>
  );
};

export default Preferences;
