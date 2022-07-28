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
    healthScore: 0,
    dishTypes: [],
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
      healthScore: 0,
      dishTypes: [],
      StepByStep: [],
      diets: [],
    });
  }

  //Validacion////////////////////////////////////////////////////////

  const regex = {
    nombre: /^[a-zA-Z]$/,
  };

  const validacion = (nombre) => {
    if (nombre.length <= 2) {
      return `Nombre muy corto`;
    } else if (regex.nombre.test(nombre)) {
      return `Tiene que ser un nombre valido`;
    }
  };

  const errorMensaje = validacion(input.name);

  ////////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      dispatch(getDiets());
    },
    // eslint-disable-next-line
    [dispatch]
  );
  return (
    <div className="createR">
      <div className="titulo">
        <h1>Crear Receta</h1>
      </div>
      <div className="create_form">
        <div className="form">
          <form onSubmit={(e) => enviarRecipe(e)}>
            <label> Name </label>
            <input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {input.name ? <p>{errorMensaje}</p> : ``}

            <label> Image </label>
            <input
              id="image"
              type="url"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            <label> Summary </label>
            <input
              id="summary"
              type="text"
              name="summary"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />
            <label> Health Score </label>
            <input
              id="healthScore"
              type="range"
              name="healthScore"
              min={1}
              max={100}
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            <p> {input.healthScore}</p>

            <label> Dish Types </label>
            <input
              id="dishTypes"
              type="text"
              name="dishTypes"
              value={input.dishTypes}
              onChange={(e) => handleChange(e)}
            />

            <label> Step By Step </label>
            <input
              id="StepByStep"
              type="text"
              name="StepByStep"
              value={input.StepByStep}
              onChange={(e) => handleChange(e)}
            />

            <label> Diets </label>
            <select
              name="diets"
              value={input.diets}
              required
              onChange={(e) => handleSelect(e)}
            >
              <option hidden>Select a Diet</option>
              {alldiets.map((e) => {
                return (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <ul>
              <p>{input.diets.map((e) => `${e} | `)}</p>
            </ul>

            <div className="buttons">
              <Link to="/home">
                <button> Volver </button>
              </Link>
              <button
                className="boton_crear"
                type="submit"
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
