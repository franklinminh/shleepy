import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Preferences.css";
import StarsImage from "../modules/Stars.svg";

const Preferences = () => {
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
      ></div>
    </div>
  );
};

export default Preferences;
