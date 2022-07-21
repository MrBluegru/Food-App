import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

export default function Card({ id, image, name, diets }) {
  return (
    <Link className="link" to={`/recipe/${id}`}>
      <div className="card" key={id}>
        <div className="nombre">
          <span>{name}</span>
        </div>

        <div className="imagen">
          <img src={image} alt={`Imagen de ${name}`} />
        </div>

        <h3>Diets</h3> 
        <div className="dietas">
          {diets.map((e) => {
            return <p key={e}>{`${e}✔`}</p>;
          })}
        </div>
      </div>
    </Link>
  );
}
