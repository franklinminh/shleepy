import React, {useEffect} from "react";
import StarsImage from "../modules/Stars.svg";
import {useLocation, useNavigate} from 'react-router-dom';
import "../../utilities.css";
import "./LoadingPage.css";

import {run_processing} from "./sleep-data-processing.js";

import { get } from "../../utilities.js";

          // onClick={() => {
          //   // get data
          //   get("/api/getData", {"user_id": user_id}).then((res) => {
          //     console.log(res);
          //     const simulation = run_processing(res);
          //     console.log(simulation);
          //     // TODO: process data, get parameters for generation. also use switches state
          //     get("/api/requestSong", 
          //         {
          //           "topic":"Crazy hyperpop song",
          //           "tags": "EDM, pop"
          //         }).then((res) => {
          //           const intervalId = setInterval(() => {
          //             get("/api/getSong", 
          //               {
          //                 "id": res.id
          //               }).then((res) => {
          //                 console.log("GET SONG");
          //                 console.log(res); 
          //                 console.log(res[0].status);
          //                 if (res[0].status =="error" || res[0].status == "complete") {
          //                   console.log("BREAK");
          //                   clearInterval(intervalId);
          //                   if (res[0].status == "complete") {
          //                     navigate('/shleep', {
          //                       state: { song: res[0].audio_url}
          //                     });
          //                   }
          //                 }
          //               });
          //           }, 30000);
          //         })
            // });
          
const LoadingPage = () => {
  const location = useLocation();
  const user_id = location.state.user_id;
  const navigate = useNavigate();
  useEffect(() => {
      // get data
      get("/api/getData", {"user_id": user_id}).then((res) => {
        console.log(res);
        const simulation = run_processing(res);
        console.log(simulation);
        // TODO: process data, get parameters for generation. also use switches state
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
                    console.log("GET SONG");
                    console.log(res); 
                    console.log(res[0].status);
                    if (res[0].status =="error" || res[0].status == "complete") {
                      console.log("BREAK");
                      clearInterval(intervalId);
                      if (res[0].status == "complete") {
                        navigate('/shleep', {
                          state: { song: res[0].audio_url, sleep_data: simulation}
                        });
                      }
                    }
                  });
              }, 30000);
            })
      });    
  })
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
