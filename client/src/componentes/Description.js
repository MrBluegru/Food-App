import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  
  return (
    <div className="descrip" key={allrecipes.id}>
      <div className="name">
        <h2>{allrecipes.name}</h2>
      </div>

      <div className="imagen">
        <img src={allrecipes.image} alt={`Food of ${allrecipes.name}`} />
      </div>

      <div className="resumen">
        <p>Summary: {allrecipes.summary}</p>
        <p>Health Score: {allrecipes.healthScore}</p>
        <p>Diets: {allrecipes.diets}</p>
        <p>Dish Types: {allrecipes.dishTypes}</p>
      </div>

      <div className="stepByS">
        <h3>Step by Step</h3>
        {allrecipes.StepByStep &&
            allrecipes.StepByStep.map((act) => (
              <div key={act.id}>
                <p>
                  <h4>Step: {act.number}</h4>
                  <h4>Summary: {act.step} </h4>
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
