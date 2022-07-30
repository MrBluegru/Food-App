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
    healthScore: 1,
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

  function handleSelectDT(e) {
    setInput({
      ...input,
      dishTypes: [...input.dishTypes, e.target.value],
    });
  }

  function handleDeleteDT(dishTypeS) {
    setInput({
      ...input,
      dishTypes: input.dishTypes.filter((e) => e !== dishTypeS),
    });
  }

  function handleDelete(dietS) {
    setInput({
      ...input,
      diets: input.diets.filter((e) => e !== dietS),
    });
  }

  function enviarRecipe(e) {
    e.preventDefault();
    dispatch(createRecipes(input));
    setInput({
      name: "",
      image: "",
      summary: "",
      healthScore: 1,
      dishTypes: [],
      StepByStep: [],
      diets: [],
    });
  }

  //Validacion////////////////////////////////////////////////////////

  const regex = {
    espacios: /^\s/,
    numeros: /[^a-z ]\ *([.0-9])*\d/g,
    caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g,
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
  };

  const validacion = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.numeros.test(entrada)) {
      return `No puede usar numeros`;
    }
    if (regex.caracteresEs.test(entrada)) {
      return `No puede usar caracteres extraños`;
    }
    if (entrada.length <= 3) {
      return `Nombre muy corto`;
    }
  };

  const validacionImg = (entrada) => {
    if (!regex.url.test(entrada)) {
      return `Url de la imagen no valida`;
    }
  };

  const errorMensaje = validacion(input.name);
  const errorImage = validacionImg(input.image);
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
            {input.image ? <p>{errorImage}</p> : ``}

            <label> Summary </label>
            <textarea
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
            <select
              id="dishTypes"
              name="dishTypes"
              value={input.dishTypes}
              onChange={(e) => handleSelectDT(e)}
            >
              <option hidden>Select a Dish Types</option>
              <option disabled="disabled" default={true} value="">
                Select a Dish Types
              </option>
              <option value="side dish">Side dish</option>
              <option value="lunch">Lunch</option>
              <option value="main course">Main course</option>
              <option value="main dish">Main dish</option>
              <option value="dinner">Dinner</option>
              <option value="morning meal">Morning meal</option>
              <option value="brunch">Brunch</option>
              <option value="breakfast">Breakfast</option>
              <option value="soup">Soup</option>
              <option value="salad">Salad</option>
              <option value="condiment">Condiment</option>
              <option value="dip">Dip</option>
              <option value="sauce">Sauce</option>
              <option value="spread">Spread</option>
            </select>

            <ul>
              {input.dishTypes.map((e) => (
                <ul key={e} onClick={() => handleDeleteDT(e)}>
                  <button>{e}</button>
                </ul>
              ))}
            </ul>

            <label> Step By Step </label>
            <textarea
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
              <option disabled="disabled" default={true} value="">
                Select a Diet
              </option>
              {alldiets.map((e) => {
                return (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>

            <ul>
              {input.diets.map((e) => (
                <ul key={e} onClick={() => handleDelete(e)}>
                  <button>{e}</button>
                </ul>
              ))}
            </ul>

            <div className="buttons">
              <Link to="/home">
                <button> Volver </button>
              </Link>
              <button
                className="boton_crear"
                type="submit"
                disabled={errorMensaje && errorImage}
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
