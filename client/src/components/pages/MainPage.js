import React, { useRef, useEffect, useState } from "react";
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
import SleepDataChart from "../modules/SleepDataChart";

function sleepConversion (value) {
  const stageLabels = {
    1: "Awake",
    4: "Light Sleep",
    5: "Deep Sleep",
    6: "REM Sleep",
  }
  return stageLabels[value] || "";
}
const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // location.state.song = "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3";

  const audioRef = useRef(null);


  const curIndex = useRef(1);

  // array of 10 songs
  const songQueue = location.state.songQueue;

  // sleep data
  const sleepData = location.state.sleepData;

  const [sleepState, setSleepState] = useState(sleepConversion(sleepData[0].stage));

  const [currentTrack, setCurrentTrack] = useState(songQueue[0]);
  // Change the audio track every 10 seconds
  useEffect(() => {
    const trackChangeInterval = setInterval(() => {
      if (curIndex.current == 10) {
        clearInterval(trackChangeInterval);
        return;
      }
      const newTrack = songQueue[curIndex.current];
      setCurrentTrack((prevTrack) => {
        return newTrack; // Return the updated track
      });
      console.log("INDEX", curIndex.current, sleepData[curIndex.current]);
      console.log(sleepData);
      console.log(currentTrack);
      console.log(sleepConversion(sleepData[curIndex.current].stage));
      setSleepState(sleepConversion(sleepData[curIndex.current].stage));
      curIndex.current = curIndex.current + 1;

    }, 1000);

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
          <div className="u-smallMarginBottom">
            <audio autoPlay loop controls ref={audioRef}>
              <source src={currentTrack} type="audio/mpeg" />
            </audio>
          </div>
          <SleepDataChart sleepData={sleepData} />
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
          <h4
            className="u-fontMontserrat u-fontSemibold u-textYellow u-noMargins"
            style={{ marginTop: "7px" }}
          >
            currently simulating: {sleepState}
          </h4>
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
    </div>
  );
};

export default MainPage;
