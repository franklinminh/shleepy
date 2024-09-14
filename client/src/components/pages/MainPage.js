import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";
import GrassImage from "../modules/Grass.svg";
import StarsImage from "../modules/Stars.svg";
import MoonImage from "../modules/Moon.svg";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background-purple">
      <div
        className="sky-flex"
        style={{
          backgroundImage: `url(${StarsImage})`,
          backgroundSize: `auto 100%`,
          backgroundPosition: "top center",
          backgroundRepeat: "repeat-x",
        }}
      >
        <div className="sky-left-flex">
          <img src={MoonImage} alt="Moon" className="moon-image" />
        </div>
        <div className="sky-middle-flex">
          <h1 className="u-fontMontserrat u-fontSemibold u-textWhite">shleepy</h1>
        </div>
        <div className="sky-right-flex">
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
            End Session
          </Button>
        </div>
      </div>
      <div
        className="grass-flex"
        style={{
          backgroundImage: `url(${GrassImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default MainPage;
