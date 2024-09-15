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
import { get } from "../../utilities.js";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const location = useLocation();

  // location.state.song = "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3";


  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack]= useState("https://cdn1.suno.ai/d32646c9-a462-4b2c-a81b-61b54489efad.mp3");
  
  const curStageIndex = useRef(1);

  // SLEEP DATA HERE: ARRAY OF 10, with {stage: x, duration: y}
  const sleepData = useRef(location.state.sleep_data);

  console.log("SLEEP DATA", sleepData.current);
  // Change the audio track every 10 seconds
  useEffect(() => {
    const trackChangeInterval = setInterval(() => {
      // done at 10th stage
      if (curStageIndex.current == 10) {
        clearInterval(trackChangeInterval);
      }
      var newTrack;

      // get track
      console.log("RETRIEVING SONG", curStageIndex.current);
      get("/api/requestSong", 
        {
          "topic":"Crazy hyperpop song",
          "tags": "EDM, pop"
        }).then((res) => {
          const intervalId = setInterval(() => {
            get("/api/getSong", 
              {
                "id": res.id
              }).then((res) => {
                console.log("LOADING SONG", curStageIndex.current);
                console.log(res); 
                console.log(res[0].status);
                if (res[0].status =="error" || res[0].status == "complete") {
                  console.log("BREAK");
                  console.log("FINISH LOADING SONG", curStageIndex.current);
                  clearInterval(intervalId);
                  if (res[0].status == "complete") {
                    newTrack = res[0].audio_url;
                    setCurrentTrack((prevTrack) => {
                      // const newTrack = "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3";
                      return res; // Return the updated track
                    });
                  }
                }
              });
          }, 10000);
        });
      setCurrentTrack((prevTrack) => {
        // const newTrack = "https://cdn1.suno.ai/1efb2e44-77ed-46ee-8e46-9c7bcdcadc9c.mp3";
        
        return newTrack; // Return the updated track
      });
      curStageIndex.current++;
      console.log("current index", curStageIndex.current, sleepData.current[curStageIndex.current]);
    }, 20000);

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
