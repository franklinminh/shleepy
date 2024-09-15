import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./MainPage.css";
import GrassImage from "../modules/Grass.svg";
import StarsImage from "../modules/Stars.svg";
import MoonImage from "../modules/Moon.svg";
import SheepGIF from "../modules/SlowerSheep.gif";
import FenceImage from "../modules/Fence.svg";
import SleepDataChart from "../modules/SleepDataChart";

function sleepConversion(value) {
  const stageLabels = {
    1: "Awake",
    4: "Light Sleep",
    5: "Deep Sleep",
    6: "REM Sleep",
  };
  return stageLabels[value] || "";
}

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const audioRef = useRef(null);

  const curIndex = useRef(1);

  const songQueue = location.state.songQueue;

  const sleepData = location.state.sleepData;

  const [sleepState, setSleepState] = useState(sleepConversion(sleepData[0].stage));

  const [currentTrack, setCurrentTrack] = useState(songQueue[0]);

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
      console.log(songQueue, curIndex.current, "WHAT");
      console.log("INDEX", curIndex.current, sleepData[curIndex.current]);
      console.log(sleepData);
      console.log(currentTrack);
      console.log(sleepConversion(sleepData[curIndex.current].stage));
      setSleepState(sleepConversion(sleepData[curIndex.current].stage));
      curIndex.current = curIndex.current + 1;
    }, 10000);
    return () => clearInterval(trackChangeInterval); // Clear interval on unmount
  }, []);

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

          {/* Centered Title and Scrollable Song Queue */}
          <div
            style={{
              marginTop: "0px",
              width: "300px",
              textAlign: "center", // Center the title and list
              color: "white",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <h3 className="u-fontMontserrat u-fontSemibold u-textYellow u-smallMarginBottom">
              queue
            </h3>
            <List
              className="scrollable-list" // Apply the class here
              sx={{
                height: "150px", // Set fixed height for scrolling
                overflowY: "scroll", // Make it scrollable
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Slight transparent background
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              {songQueue.map((song, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: "3px 0", // Reduce padding to decrease vertical spacing
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.2rem", // Smaller font size (14px)
                    marginBottom: "0px", // Reduce the margin between list items
                  }}
                >
                  {/* Star bullet or numbering */}
                  <span
                    style={{ marginRight: "10px", color: "var(--yellow)", fontSize: "0.875rem" }}
                  >
                    ★
                  </span>

                  {/* Song Name as a Hyperlink */}
                  <a
                    href={song}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <ListItemText primary={song} />
                  </a>

                  {/* Open in new tab icon as a clickable link */}
                  <a href={song} target="_blank" rel="noopener noreferrer">
                    <OpenInNewIcon
                      sx={{
                        color: "var(--yellow)", // Adjust color of the icon
                        marginLeft: "10px", // Add some space before the icon
                        fontSize: "1.2rem", // Adjust size of the icon
                      }}
                    />
                  </a>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        <div className="sky-middle-flex">
          <h1 className="u-fontMontserrat u-fontSemibold u-textWhite">shleepy</h1>
          <div className="u-smallMarginBottom">
            <audio autoPlay loop controls ref={audioRef}>
              <source src={currentTrack} type="audio/mpeg" />
            </audio>
          </div>
          <div className="chart-container">
            <SleepDataChart sleepData={sleepData} />
          </div>
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
