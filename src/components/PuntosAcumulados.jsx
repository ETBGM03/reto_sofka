import React from "react";

const PuntosAcumulados = ({ puntos }) => {
  return (
    <div
      style={{
        color: "white",
        fontSize: "1rem",
        position: "relative",
        left: "35%",
        marginTop: "3rem",
      }}
    >
      <span>{puntos} Puntos Acumulados</span>
    </div>
  );
};

export { PuntosAcumulados };
