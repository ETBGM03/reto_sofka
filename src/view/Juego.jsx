import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PuntosAcumulados } from "../components/PuntosAcumulados";
const Juego = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [pregunta, setPregunta] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [respuestaValida, setRespuestaValida] = useState(null);
  const [puntos, setPuntos] = useState([0]);
  const [respuestaInvalida, setRespuestaInvalida] = useState(null);
  const [deshabilitar, setDeshabilitar] = useState(false);
  const [sgtRonda, setSgtRonda] = useState(null);
  const [mostrarTablaPsociones, setmostrarTablaPsociones] = useState(null);

  const obtenerUsuarioCreado = async () => {
    let url = `http://localhost:3001/v1/api/usuario`;
    let respon = await fetch(url);
    let data = await respon.json();
    setUsuarios(data);
  };
  useEffect(() => {
    obtenerUsuarioCreado();
  }, []);

  let param = useParams();
  let idUrl = parseInt(param.id); //idUrl con la cual hacemos una peticion/consulta para traer la pregunta random

  //esta funcion es para traer la pregunta random de la DB
  const getRondaInicioJuego = async () => {
    try {
      let url = `http://localhost:3001/v1/api/ronda/${idUrl}`;
      let data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let ronda = await data.json();
      setPregunta(ronda);
    } catch (error) {
      console.log(error);
    }
  };
  //esta funcion es para consultar el total de puntos acumulados del jugador actual
  const getPuntosUsuario = async () => {
    let { idusuario } = usuarios[0];
    try {
      let url = `http://localhost:3001/v1/api/obtener-puntos/${idusuario}`;
      let data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let puntos = await data.json();
      setPuntos(puntos.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPuntosUsuario();
  }, [usuarios]);

  //ejecutamos esta funcion para que cada que cambie el id en la url se ejecute y poder sacar,
  //la pregunta randon acorde a la ronda la cual esté jugando
  useEffect(() => {
    getRondaInicioJuego();
  }, [idUrl]);

  //aqui hacemos la consulta que trae a las respuestas de la pregunta random
  //por medio de un efecto de usestate
  useEffect(async () => {
    let { idpregunta } = pregunta[0];
    getRespuestas(idpregunta);
  }, [pregunta]);

  async function getRespuestas(id_pregunta) {
    try {
      let url = `http://localhost:3001/v1/api/respuestas/${id_pregunta}`;
      let data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let respuestas = await data.json();
      setRespuesta(respuestas);
    } catch (error) {
      console.log(error);
    }
  }

  const validarSiEsCorrecta = (valida) => {
    if (valida === 1) {
      let puntaje = Number(pregunta[0].puntaje);
      setRespuestaValida(true); //si la respuesta es correcta
      setSgtRonda(true);
      setDeshabilitar(true);
      setmostrarTablaPsociones(false);
      setPuntos([{ puntajeUsuario: puntaje }]);
    } else {
      setRespuestaInvalida(true); //si la respuesta es incorrecta
      setDeshabilitar(true);
      setSgtRonda(false);
      setmostrarTablaPsociones(true);
    }
  };
  const redireccionadion = (idRonda) => {
    if (idRonda > 5) {
      window.location.replace(`http://localhost:3000/posiciones`);
    } else {
      window.location.replace(`http://localhost:3000/ronda/${idRonda}`);
    }
  };

  const mostrarTablaPosiciones = (e) => {
    e.preventDefault();
    window.location.replace(`http://localhost:3000/posiciones`);
  };

  const guardarDatosRonda = async (e) => {
    let { idusuario, nombre, apellido, identificacion } = usuarios[0];
    let puntos2 = puntos[0].puntajeUsuario;
    try {
      e.preventDefault();
      let respon = await fetch("http://localhost:3001/v1/api/guardar-ronda", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          identificacion,
          puntos2,
          idusuario,
        }),
      });
      setTimeout(() => {
        redireccionadion(idUrl + 1);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      <PuntosAcumulados puntos={puntos[0].puntajeUsuario} />
      <h2 style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}>
        Empezamos a jugar
      </h2>

      {respuestaValida ? (
        <span style={{ color: "green", fontSize: "1.4rem" }}>
          Respuesta Correcta
        </span>
      ) : null}
      {respuestaInvalida ? (
        <span style={{ color: "red", fontSize: "1.4rem" }}>
          Respuesta Incorrecta
        </span>
      ) : null}

      {pregunta.map((pre) => (
        <p
          style={{
            fontSize: "2rem",
            color: "white",
            width: "75vw",
            textAlign: "center",
            marginBottom: "1rem",
          }}
          key={pre.id_pregunta}
        >
          {pre.pregunta}
        </p>
      ))}

      {respuesta.map((res) => (
        <>
          <button
            disabled={deshabilitar}
            key={res.id_respuesta}
            onClick={() => validarSiEsCorrecta(res.valida)}
            style={{
              fontSize: "1rem",
              borderRadius: "1rem",
              height: "5rem",
              width: "25rem",
              cursor: "pointer",
              margin: ".5rem 0",
            }}
          >
            {res.respuesta_pregunta}
          </button>
        </>
      ))}
      {sgtRonda ? (
        <input
          style={{
            backgroundColor: "#25561D",
            color: "white",
            borderRadius: ".3rem",
            height: "2rem",
            width: "10rem",
            margin: ".5rem 0",
            fontSize: "1rem",
            fontWeight: "650",
            cursor: "pointer",
          }}
          type="button"
          name="sgtRonda"
          id="sgtRonda"
          value="Siguiente Ronda"
          onClick={(e) => guardarDatosRonda(e)}
        />
      ) : null}
      {mostrarTablaPsociones ? (
        <input
          style={{
            backgroundColor: "#25561D",
            color: "white",
            borderRadius: ".3rem",
            height: "2rem",
            width: "10rem",
            margin: ".5rem 0",
            fontSize: "1rem",
            fontWeight: "650",
            cursor: "pointer",
          }}
          type="submit"
          name="sgtRonda"
          id="sgtRonda"
          value="Ver tabla posiciones"
          onClick={(e) => mostrarTablaPosiciones(e)}
        />
      ) : null}
    </main>
  );
};

export { Juego };
