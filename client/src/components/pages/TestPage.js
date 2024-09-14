
import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get } from "../../utilities.js";
const TestPage = () => {
  useEffect(() => {
    get("/api/getProviders").then((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    get("/api/getSong").then((res) => {
      console.log(res);
    });
  });

  return (
    <div>
      <h1>HI TEST</h1>
      <p>Test.</p>
      <button
      onClick={() => {
        get("/api/generateWidgetSession").then((res) => {
          console.log(res);
        });
      }}
    > 
      Generate Widget Session
    </button>
    <button
      onClick={() => {
        get("/api/getData").then((res) => {
          console.log(res);
        });
      }}
    > 
      Request Data
    </button>
    <button
      onClick={() => {
        get("/api/requestSong").then((res) => {
          console.log(res);
        });
      }}
    > 
    Request Song
    </button>
    <button
      onClick={() => {
        get("/api/getSong").then((res) => {
          console.log(res);
        });
      }}
    > 
    Get Song
    </button>
    </div>
  );
};

export default TestPage;
