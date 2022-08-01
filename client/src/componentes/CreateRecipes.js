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
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
    if (input.diets.includes(e.target.value)) {
      alert`no puedes añadir una diet ya agregada`;
    }
  }

  function handleSelectDT(e) {
    if (!input.dishTypes.includes(e.target.value)) {
      setInput({
        ...input,
        dishTypes: [...input.dishTypes, e.target.value],
      });
    }
    if (input.dishTypes.includes(e.target.value)) {
      alert`no puedes añadir un dish type ya agregado`;
    }
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
    if (DesactivateDisable !== undefined) {
      return alert(`NO PODES CREAR RECETAS COMO SE TE DE LA GANA MAKINOLA, 
      TE PENSAS QUE CON QUITAR EL DISABLED TODO ESTARA BIEN, PERO NO ES ASI, NO, NO, NO, 
      NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`);
    } else {
      dispatch(createRecipes(input));
      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: null,
        dishTypes: [],
        StepByStep: [],
        diets: [],
      });
      alert(`Receta creada MAKINOLAA`);
    }
  }

  //Validacion////////////////////////////////////////////////////////

  const regex = {
    espacios: /^\s/, // eslint-disable-line
    numeros: /[^a-z ]\ *([.0-9])*\d/g, // eslint-disable-line
    caracteresEs: /[\[\\\^\$\.\|\?\*\+\(\)\{\}]/g, // eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, // eslint-disable-line
  };

  const validacionName = (entrada) => {
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

  const validacionSumm = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.caracteresEs.test(entrada)) {
      return `No puedes usar caracteres extraños`;
    }
  };
  const validacionSbS = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.caracteresEs.test(entrada)) {
      return `No puedes usar caracteres extraños`;
    }
  };

  const validacionDishT = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que minimo tenga un tipo de plato`;
    }
  };

  const validacionDiets = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que minimo tenga un tipo de Dieta`;
    }
  };

  const errorMensaje = validacionName(input.name);
  const errorImage = validacionImg(input.image);
  const errorSummary = validacionSumm(input.summary);
  const errorStepByStep = validacionSbS(input.StepByStep);
  const errorDishT = validacionDishT(input.dishTypes);
  const errorDiets = validacionDiets(input.diets);

  const funcionGeneral = (eName, eImage, eSummary, eStepBS, eDishT, eDiets) => {
    if (
      eName === undefined &&
      eImage === undefined &&
      eSummary === undefined &&
      eStepBS === undefined &&
      eDishT === undefined &&
      eDiets === undefined
    ) {
      return undefined;
    } else {
      return true;
    }
  };
  const DesactivateDisable = funcionGeneral(
    errorMensaje,
    errorImage,
    errorSummary,
    errorStepByStep,
    errorDishT,
    errorDiets
  );

  ////////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      dispatch(getDiets());
    },
    [dispatch]
  );
  return (
    <div className="createR">
      <div className="titulo">
        <Link className="homeLink"to="/home">
          <button className="volver">🏠</button>
        </Link>
        <h1>Crear Receta</h1>
      </div>
      <div>
        <form className="create_form" onSubmit={(e) => enviarRecipe(e)}>
          <div className="nameF">
            <label> Name </label>

            <input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {input.name ? <span>{errorMensaje}</span> : ``}
          </div>

          <div className="imagenF">
            <label> Image </label>
            <input
              id="image"
              type="url"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            {input.image ? <span>{errorImage}</span> : ``}
          </div>

          <div className="summaryF">
            <label> Summary </label>
            <textarea
              id="summary"
              type="text"
              name="summary"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />
            {input.summary ? <span>{errorSummary}</span> : ``}
          </div>

          <div className="stepBSF">
            <label> Step By Step </label>
            <textarea
              id="StepByStep"
              type="text"
              name="StepByStep"
              value={input.StepByStep}
              onChange={(e) => handleChange(e)}
            />
            {input.StepByStep ? <span>{errorStepByStep}</span> : ``}
          </div>

          <div className="dishTF">
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

            {input.dishTypes.map((e) => (
              <span key={e} onClick={() => handleDeleteDT(e)}>
                <button>{e}</button>
              </span>
            ))}
          </div>

          <div className="dietsF">
            <select
              name="diets"
              value={input.diets}
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

            <spam>
              {input.diets.map((e) => (
                <p key={e} onClick={() => handleDelete(e)}>
                  <button>{e}</button>
                </p>
              ))}
            </spam>
          </div>

          <div className="healthSF">
            <label> Health Score </label>
            <input
              id="healthScore"
              type="range"
              name="healthScore"
              min={0}
              max={100}
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            <span> {input.healthScore}</span>
          </div>

          <div className="buttons">
            <button
              className="boton_crear"
              type="submit"
              disabled={DesactivateDisable}
            >
              Crear Receta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
