import React, { useState } from "react";
import { CrearUsuario } from "./view/CrearUsuario";
import { Juego } from "./view/Juego";
import { Posiciones } from "./view/Posiciones";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <hr />
      <Router>
        <Routes>
          <Route exact path="/" element={<CrearUsuario />} />
          <Route exact path="/ronda/:id" element={<Juego />} />
          <Route exact path="/posiciones" element={<Posiciones />} />
        </Routes>
      </Router>
      ,
    </div>
  );
};

export { App };
