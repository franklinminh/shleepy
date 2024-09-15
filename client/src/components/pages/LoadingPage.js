import React, { useEffect } from "react";
import StarsImage from "../modules/Stars.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "../../utilities.css";
import "./LoadingPage.css";
import { run_processing, generateMusicPrompts } from "./sleep-data-processing.js";
import { requestSong } from "./parallel_song_gen.js";
import { get } from "../../utilities.js";

const LoadingPage = () => {
  const location = useLocation();
  const user_id = location.state.user_id;
  const user_sound = location.state.user_sound;
  const songQueue = [];
  var simulation;

  console.log("USER SOUND", user_sound);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSongs = async () => {
      // get data
      var prompts;
      await get("/api/getData", { user_id: user_id }).then((res) => {
        console.log(res);
        simulation = run_processing(res);
        console.log("Simulation", simulation);
        prompts = generateMusicPrompts(simulation, user_sound);
      });
      const songPromises = prompts.map((prompt, index) => requestSong(prompt));
      // Iterate through the prompts and request songs
      const songUrls = await Promise.all(songPromises);
      return songUrls;
    };
    fetchSongs().then((res) => {
      for (const song of res) {
        songQueue.push(song);
        console.log(songQueue);
      }
      navigate("/shleep", { state: { songQueue: songQueue, sleepData: simulation } });
    });
  }, []);
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
        <h1 className="u-fontMontserrat u-fontSemibold u-textWhite u-noMargin">
          generating content...
        </h1>
        <div className="z-animation-wrapper">
          <span className="animate-z small-z delay-0 u-fontMontserrat u-fontSemibold u-textWhite">
            z
          </span>
          <span className="animate-z medium-z delay-1 u-fontMontserrat u-fontSemibold u-textWhite">
            z
          </span>
          <span className="animate-z large-z delay-2 u-fontMontserrat u-fontSemibold u-textWhite">
            z
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
