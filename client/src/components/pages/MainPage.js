import React, {useRef, useEffect} from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {useLocation } from "react-router-dom";
import "./MainPage.css";
import GrassImage from "../modules/Grass.svg";
import StarsImage from "../modules/Stars.svg";
import MoonImage from "../modules/Moon.svg";
// import SheepGIF from "../modules/SheepGIF.gif";
import SheepGIF from "../modules/SlowerSheep.gif";
import FenceImage from "../modules/Fence.svg";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state?.song);
  // const audioRef = useRef(null);

  // Play the audio when the component mounts
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = true;
  //     audioRef.current.play().catch((error) => {
  //         console.log("Autoplay failed due to browser restrictions:", error);
  //     });
  // }
  // }, []);

  const fenceVariants = {
    animate: {
      x: ["100vw", "-100vw"],
    },
  };

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
      >
        <img src={SheepGIF} alt="Sheep" className="sheep-gif" />

        <motion.img
          src={FenceImage}
          alt="Fence"
          className="fence"
          variants={fenceVariants}
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: 2.86,
            delay: 0,
            ease: "linear",
          }}
          style={{ position: "absolute", bottom: 0, width: "150px" }}
        />
      </div>
      <audio autoPlay loop>
        <source src={location.state?.song} type="audio/mpeg"/>
      </audio>
    </div>
  );
};

export default MainPage;
