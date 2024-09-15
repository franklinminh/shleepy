import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import StarsImage from "../modules/Stars.svg";

const LandingPage = () => {
  const navigate = useNavigate();

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
            navigate("/");
          }}
        >
          Connect Wearable
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
