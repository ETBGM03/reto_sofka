import React, { useState, useEffect } from "react";

const Posiciones = () => {
  const [posiciones, setPosiciones] = useState([]);
  const consultarPosicionesJugadores = () => {
    let url = `http://localhost:3001/v1/api/posiciones`;
    let data = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    data
      .then((res) => res.json())
      .then((res) => {
        setPosiciones(res);
      });
  };
  useEffect(() => {
    consultarPosicionesJugadores();
  }, []);

  return (
    <div
      style={{
        width: "90%",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "2rem" }}>
        TABLA DE POSICIONES DE LOS JUGADORES
      </h2>
      <ol>
        {posiciones.map((el) => (
          <li key={el.Cc} style={{ color: "white", fontSize: "1.4rem" }}>
            {el.Nombre} {el.Apellido} {el.puntajeUser + " puntos"}
          </li>
        ))}
      </ol>

      <div
        style={{
          width: "90%",
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <footer>
          <a
            style={{
              color: "#000000",
              fontSize: "1.4rem",
            }}
            href="http://localhost:3000"
            rel="noopener noreferrer"
          >
            Jugar Nuevamente
          </a>
        </footer>
      </div>
    </div>
  );
};

export { Posiciones };
