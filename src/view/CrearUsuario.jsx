import React, { useEffect, useState } from "react";
import "./../css/CrearUsuario.css";

const CrearUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [valoresform, setValoresform] = useState({
    nombre: "",
    apellido: "",
    identificacion: 0,
  });
  let { nombre, apellido, identificacion } = valoresform;

  const handleInputChange = (e) => {
    setValoresform({
      ...valoresform,
      [e.target.name]: e.target.value,
    });
  };

  const enviarValoresForm = async (e) => {
    if (nombre === "" || apellido === "" || identificacion === 0) {
      e.preventDefault();
      setError(true);
      return;
    } else {
      e.preventDefault();
      setLoading(true);
      setError(false);
      let respon = await fetch("http://localhost:3001/v1/api/crearUsuario", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          identificacion,
        }),
      });
      let data = await respon.json();
      if (data.status === 201) {
        setTimeout(() => {
          setLoading(false);
          redireccionadion();
        }, 2500);
      }

      setValoresform({
        nombre: "",
        apellido: "",
        identificacion: 0,
      });
      e.target.reset();
    }
  };
  const redireccionadion = () => {
    window.location.replace("http://localhost:3000/ronda/1");
  };

  return (
    <div className="container-form">
      <form onSubmit={enviarValoresForm} className="form-crear-usuario">
        {error ? (
          <span style={{ color: "red", fontSize: "1.4rem" }}>
            Todos los campos son requeridos
          </span>
        ) : null}
        <input
          type="text"
          name="nombre"
          className="input"
          id="input1"
          placeholder="Nombre usuario"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="apellido"
          id="input2"
          className="input"
          placeholder="Apellido usuario"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="identificacion"
          id="input3"
          className="input"
          placeholder="Cédula usuario"
          onChange={handleInputChange}
        />
        <div>
          {loading ? (
            <span
              style={{
                color: "#121f3d",
                fontSize: "1.5rem",
                fontWeight: "450",
              }}
            >
              Cargando...
              <div
                style={{
                  width: "6.7rem",
                  height: "4px",
                  backgroundColor: "white",
                }}
              ></div>
            </span>
          ) : (
            <button
              style={{
                backgroundColor: "#00a8ff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "1.5rem",
                outline: "none",
              }}
              type="submit"
            >
              Iniciar Juego
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export { CrearUsuario };
