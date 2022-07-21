import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/navBar.css";

export default function NavBar() {
  const handleclick = () => {};
  const handleOrderName = () => {};
  const handleOrderHealthS = () => {};
  const handleFilterDiets = () => {};

  return (
    <div className="nav_bar">
      <div className="nav_search">
        <SearchBar />
      </div>

      <div className="recargarRecetas">
        <button
          onClick={(e) => {
            handleclick(e);
          }}
        >
          Cargar recetas de nuevo
        </button>
      </div>

      <div className="act">
        <Link className="link" to="/Recipes">
          <button>Crear Receta</button>
        </Link>
      </div>

      <div className="order_name">
        <select onChange={(e) => handleOrderName(e)}>
          <option value="">Ordenar por nombre </option>
          <option value="asc">Ascendente(A-Z)</option>
          <option value="desc">Descendente(Z-A)</option>
        </select>
      </div>

      <div className="order_healthS">
        <select onChange={(e) => handleOrderHealthS(e)}>
          <option value="">Ordenar por Health Score</option>
          <option value="healthSDesc">Mayor a menor</option>
          <option value="healthSAsc">Menor a mayor</option>
        </select>
      </div>

      <div className="filter_type_diets">
        <select  className="filt_act" onChange={(e) => handleFilterDiets(e)}>
          <option value="All">Filtrar por Dieta</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="fodmap friendly">Fodmap friendly</option>
        </select>
      </div>
    </div>
  );
}
