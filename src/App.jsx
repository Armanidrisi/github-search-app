import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import 'material-icons/iconfont/material-icons.css';
import "react-toastify/dist/ReactToastify.css";
import M from "materialize-css";

import Home from "./screens/Home";
import Details from "./screens/Details";

function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repo/:username/:repo" element={<Details />} />
    </Routes>
  );
}

export default App;
