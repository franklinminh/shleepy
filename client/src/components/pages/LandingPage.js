import React, {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import StarsImage from "../modules/Stars.svg";

import { get } from "../../utilities.js";

import "../../utilities.css";


const LandingPage = () => {
  const navigate = useNavigate();
  const [referenceName, setReferenceName] = useState('');
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
        <h1 className="u-fontMontserrat u-fontSemibold u-textWhite u-noMargin">shleepy</h1>
        <h3 className="u-fontMontserrat u-fontRegular u-textWhite u-smallMarginTop">
          no more counting sheep, just shleep to the beat ♬
        </h3>
        <TextField 
          label="Reference Name" 
          variant="outlined" 
          value={referenceName}
          onChange={(e) => setReferenceName(e.target.value)}
          color="primary">
        Hello World
      </TextField>
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
            get("/api/generateWidgetSession", {reference: referenceName}).then((res) => {
              window.location.href = res.url;
            });
          }}
        >
          Connect Wearable
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
