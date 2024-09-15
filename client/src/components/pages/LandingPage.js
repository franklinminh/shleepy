import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "./LandingPage.css";

import StarsImage from "../modules/Stars.svg";

const LandingPage = () => {
  const [referenceName, setReferenceName] = useState("");
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
        <h1 className="u-fontMontserrat u-fontSemibold u-textWhite u-smallMarginBottom u-textCenter">
          shleepy
        </h1>
        <h3 className="u-fontMontserrat u-fontRegular u-textWhite u-noMargin u-textCenter">
          no more counting sheep, just shleep to the beat ♬
        </h3>
        <h5
          className="u-fontMontserrat u-fontMedium u-textWhite u-textCenter u-smallMarginTop u-fontItalic"
          y
        >
          Our platform uses your wearable data <br />
          combined with generative AI to <br />
          create personalized music tailored
          <br /> to your unique shleep needs.
        </h5>
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
            get("/api/generateWidgetSession", { reference: referenceName }).then((res) => {
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
