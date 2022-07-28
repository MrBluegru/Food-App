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

        <div className="healthS">
          <p>Health Score: {allrecipes.healthScore}</p>
        </div>
        <div className="imageHSDiets">
          <p>
            Diets:
            {allrecipes.diets?.map((e) => {
              return <p key={e}>{`${e}✔`}</p>;
            })}
          </p>
          <img
            className="image-descrip"
            src={allrecipes.image}
            alt={`Food of ${allrecipes.name}`}
          />
          <p>
            Dish Types:
            {allrecipes.dishTypes?.map((e) => {
              return <p key={e}>{`✔ ${e}`}</p>;
            })}
          </p>
        </div>

        <div className="resumen">
          <div className="resumen-descrip">
            <p dangerouslySetInnerHTML={{ __html: descript }} />
          </div>

          <div className="stepByS">
            <div className="step-descripS">
              <spam >Step by Step</spam>
            </div>
            {allrecipes.StepByStep?.map((e) => {
              return <ul key={e}>{`✔ ${e}`} </ul>;
            })}
          </div>

          <div className="button_volver">
            <Link className="link_home" to="/home">
              <button>Volver</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
