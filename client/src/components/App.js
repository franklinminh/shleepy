import React from "react";
import { Routes, Route } from "react-router-dom";
import "../utilities.css";

import NotFound from "./pages/NotFound.js";
import MainPage from "./pages/MainPage.js";
import LandingPage from "./pages/LandingPage.js";
import Preferences from "./pages/Preferences.js";
import LoadingPage from "./pages/LoadingPage.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shleep" element={<MainPage />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/loading" element={<LoadingPage />} />
    </Routes>
  );
};

export default App;
