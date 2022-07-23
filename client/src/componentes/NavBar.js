import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/navBar.css";
import { getRecipes, filterDiet, orderByName, orderByHealthScore } from "../redux/action";

export default function NavBar() {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleclick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
    setCurrentPage(1);
    window.location.replace('');
  };

  
  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  
  
  const handleOrderHealthS = (e) => {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);

  };


  const handleFilterDiets = (e) => {
   e.preventDefault();
   dispatch(filterDiet(e.target.value));
  }


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
          Todas las recetas
        </button>
      </div>

      <div className="act">
        <Link className="link" to="/createRecipe">
          <button>Crear Receta</button>
        </Link>
      </div>

      <div className="order_name">
        <select onChange={(e) => handleOrderName(e)} >
          <option hidden>Ordenar por nombre </option>
          <option disabled="disabled" default={true} value="">Ordenar por nombre </option>
          <option value="asc">Ascendente (A-Z)</option>
          <option value="desc">Descendente (Z-A)</option>
        </select>
      </div>

      <div className="order_healthS">
        <select onChange={(e) => handleOrderHealthS(e)}>
          <option hidden>Ordenar por Health Score</option>
          <option disabled="disabled" default={true} value="">Ordenar por Health Score</option>
          <option value="healthSDesc">Mayor a menor</option>
          <option value="healthSAsc">Menor a mayor</option>
        </select>
      </div>

      <div className="filter_type_diets">
        <select  className="filt_act" onChange={(e) => handleFilterDiets(e)}>
          <option hidden>Filtrar por Dieta</option>
          <option disabled="disabled" default={true} value="">Filtrar por Dieta</option>
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
