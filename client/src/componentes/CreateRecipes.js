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
  // const validacionDT = () => {
  //   if(a){

  //   }
  // };
  // const validacionD = () => {
  //   if(a){

  //   }
  // };

  const errorMensaje = validacionName(input.name);
  const errorImage = validacionImg(input.image);
  const errorSummary = validacionSumm(input.summary);
  const errorStepByStep = validacionSbS(input.StepByStep);
  // const errorDishTypes = validacionDT(input.dishTypes);
  // const errorDiets = validacionD(input.diets);

  const funcionGeneral = (eName, eImage, eSummary, eStepBS) => {
    if (
      eName === undefined &&
      eImage === undefined &&
      eSummary === undefined &&
      eStepBS === undefined
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
    errorStepByStep
  );

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
        <div>
          <form className="form" onSubmit={(e) => enviarRecipe(e)}>
            <label> Name </label>
            <input
              id="name"
              type="text"
              name="name"
              value={input.name}
              required
              title="La receta necesita un nombre"
              onChange={(e) => handleChange(e)}
            />
            {input.name ? <p>{errorMensaje}</p> : ``}

            <label> Image </label>
            <input
              id="image"
              type="url"
              name="image"
              value={input.image}
              required
              title="La receta necesita una imagen"
              onChange={(e) => handleChange(e)}
            />
            {input.image ? <p>{errorImage}</p> : ``}

            <label> Summary </label>
            <textarea
              id="summary"
              type="text"
              name="summary"
              value={input.summary}
              required
              title="La receta necesita una descripcion breve"
              onChange={(e) => handleChange(e)}
            />
            {input.summary ? <p>{errorSummary}</p> : ``}

            <label> Step By Step </label>
            <textarea
              id="StepByStep"
              type="text"
              name="StepByStep"
              value={input.StepByStep}
              required
              title="La receta necesita al menos un paso"
              onChange={(e) => handleChange(e)}
            />
            {input.StepByStep ? <p>{errorStepByStep}</p> : ``}

            <label> Dish Types </label>
            <select
              id="dishTypes"
              name="dishTypes"
              value={input.dishTypes}
              required
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

            <p>
              {input.dishTypes.map((e) => (
                <p key={e} onClick={() => handleDeleteDT(e)}>
                  <button>{e}</button>
                </p>
              ))}
            </p>

            <label> Diets </label>

            <div>
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
            </div>

            <div>
              <label> Health Score </label>
              <input
                id="healthScore"
                type="range"
                name="healthScore"
                min={1}
                max={100}
                title="El valor de la receta es de 1 por defecto pero puede ser cambiado con un maximo de 100"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              <p> {input.healthScore}</p>
            </div>

            <div className="buttons">
              <Link to="/home">
                <button> Volver </button>
              </Link>
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
    </div>
  );
}
