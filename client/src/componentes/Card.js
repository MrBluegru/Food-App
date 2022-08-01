import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

export default function Card({ id, image, name, healthScore, diets }) {
  return (
    <Link className="link" to={`/recipes/${id}`}>
      <div className="card" key={id}>
        <div className="nombre">
          <span>{name}</span>
        </div>
        
        <div className="hS">
          <span> HS: {healthScore}</span>
        </div>

        <div className="imagen">
          <img src={image} alt={`Imagen de ${name}`} />
        </div>

        <div className="diets_title">
          <span>Diets</span>
        </div>

        <div className="dietas">
          {diets.length
            ? diets.map((e) => {
                return <p key={e}>{`${e} ✔`}</p>;
              })
            : diets}
        </div>
      </div>
    </Link>
  );
}
