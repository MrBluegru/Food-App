import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, createRecipes } from "../redux/action";
import "../styles/createRecipes.css";

export default function CreateAct() {
  const dispatch = useDispatch();
  const alldiets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: null,
    StepByStep: [],
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function enviarRecipe(e) {
    e.preventDefault();
    dispatch(createRecipes(input));
    setInput({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      StepByStep: [],
      diets: [],
    });
  }

  //Validacion////////////////////////////////////////////////////////

  const regex = {
    nombre: /^[a-z ,.'-]+$/i,
  }

  const validacion = (nombre) => {
    if(nombre.length <= 2) {
      return `Nombre muy corto`;
    } else if(!regex.nombre.test(nombre)) {
      return `Tiene que ser un nombre valido`
    }
  }

  const errorMensaje = validacion(input.name);

  console.log(errorMensaje);

  ////////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      dispatch(getDiets());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="createR">
      <div className="titulo">
        <h1>Crear Receta</h1>
      </div>
      <div className="create_form">
        <div className="form">
          <form>
            <label> Name </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {input.name ? <p>{errorMensaje}</p> : ``}

            <label> Image </label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            <label> Summary </label>
            <input
              type="text"
              name="summary"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />
            <label> Health Score </label>
            <input
              type="number"
              name="healthScore"
              min={0}
              max={100}
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            <label> Step By Step </label>
            <input
              type="text"
              name="StepByStep"
              value={input.StepByStep}
              onChange={(e) => handleChange(e)}
            />

            <label> Diets </label>
            <select
              name="diets"
              value={input.diets}
              onChange={(e) => handleSelect(e)}
            >
              {alldiets.map(({ name }) => {
                return (
                  <option key={name} value={name} >
                    {name}
                  </option>
                );
              })}
            </select>
            <ul>
              <p>{input.diets.map((e) => `${e} | `)}</p>
            </ul>

            <div className="buttons">
              <button>
                <Link to="/home"> Volver </Link>
              </button>
              <button 
              className="boton_crear"
              type="submit" 
              onClick={(e) => enviarRecipe(e)}
              disabled={errorMensaje}
              >
                Crear Receta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
