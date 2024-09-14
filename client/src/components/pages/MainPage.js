import React from "react";

import "./MainPage.css";
import GrassImage from "../modules/Grass.svg";

const MainPage = () => {
  return (
    <div className="background-purple">
      <div className="sky-flex">
        <h1>ssshleepy</h1>
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
        <h1>ssshleepy</h1>
      </div>
    </div>
  );
};

export default MainPage;
