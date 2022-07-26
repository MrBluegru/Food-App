import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById } from "../redux/action";
import "../styles/description.css";

export default function Description() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allrecipes = useSelector((state) => state.recipesDetails);
  useEffect(() => {
    dispatch(getRecipesById(id));
  }, [dispatch, id]);

  const descript = allrecipes.summary;

  return (
    <div className="descrip" key={allrecipes.id}>
      <div className="descrip-chilld">
        <div className="name">
          <h1>{allrecipes.name}</h1>
        </div>

        <div className="imagen">
          <img src={allrecipes.image} alt={`Food of ${allrecipes.name}`} />
        </div>

        <div className="resumen">
          <div>
            <p dangerouslySetInnerHTML={{ __html: descript }} />
          </div>
          <p>Health Score: {allrecipes.healthScore}</p>
          <p>Diets: {allrecipes.diets}</p>
          <p>Dish Types: {allrecipes.dishTypes}</p>
        </div>

        <div className="stepByS">
          <h3>Step by Step</h3>
          <div>
            {allrecipes.StepByStep?.map((e) => {
              return e.steps?.map(({ number, step }) => {
                return <li key={number}>{step}</li>;
              });
            })}
          </div>
        </div>

        <Link className="link_home" to="/home">
          <button className="button_volver">Volver</button>
        </Link>
      </div>
    </div>
  );
}
