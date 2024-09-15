import React from "react";
import StarsImage from "../modules/Stars.svg";
import "../../utilities.css";
import "./LoadingPage.css";

const LoadingPage = () => {
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
