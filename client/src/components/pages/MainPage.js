import React, {useRef, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  // const location = useLocation();

  // location.state.song = "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3";


  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack]= useState("");
  
  const crazy = useRef(true);

  // SLEEP DATA HERE: ARRAY OF 10, with {stage: x, duration: y}
  const sleepData = location.state.sleep_data;
  console.log(sleepData);
  // Change the audio track every 10 seconds
  useEffect(() => {
    const trackChangeInterval = setInterval(() => {
      crazy.current = !(crazy.current)
      setCurrentTrack((prevTrack) => {
        const newTrack = crazy.current
          ? "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3"
          : "https://cdn1.suno.ai/d32646c9-a462-4b2c-a81b-61b54489efad.mp3";
        console.log("SWAP", newTrack, crazy);
        return newTrack; // Return the updated track
      });
    }, 10000);

    return () => clearInterval(trackChangeInterval); // Clear interval on unmount
  }, []);

  ///Play the audio when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
          console.log("Autoplay failed due to browser restrictions:", error);
      });
  }
  }, [currentTrack]);

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
      <audio autoPlay loop controls ref ={audioRef}>
        <source src={currentTrack} type="audio/mpeg"/>
      </audio>
    </div>
  );
};

export default MainPage;
