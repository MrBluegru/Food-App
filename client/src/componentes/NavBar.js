import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/navBar.css";
import {
  getRecipes,
  filterDiet,
  orderByName,
  orderByHealthScore,
} from "../redux/action";

export default function NavBar() {
  const dispatch = useDispatch();


  const handleclick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
    window.location.replace("");
  };

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  const handleOrderHealthS = (e) => {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
  };

  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterDiet(e.target.value));
  };

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
          All recipes
        </button>
      </div>

      <div className="act">
        <Link className="link" to="/createRecipe">
          <button>Create Recipe</button>
        </Link>
      </div>

      <div className="order_name">
        <select onChange={(e) => handleOrderName(e)}>
          <option hidden>Sort by name </option>
          <option disabled="disabled" default={true} value="">
            Sort by name{" "}
          </option>
          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>
        </select>
      </div>

      <div className="order_healthS">
        <select onChange={(e) => handleOrderHealthS(e)}>
          <option hidden>Sort by Health Score</option>
          <option disabled="disabled" default={true} value="">
            Sort by Health Score
          </option>
          <option value="healthSDesc">Highest to lowest</option>
          <option value="healthSAsc">Lowest to highest</option>
        </select>
      </div>

      <div className="filter_type_diets">
        <select className="filt_act" onChange={(e) => handleFilterDiets(e)}>
          <option hidden>Filter by Diet</option>
          <option disabled="disabled" default={true} value="">
            Filter by Diet
          </option>
          <option value="all">All</option>
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
          <option value="None">None</option>
        </select>
      </div>
    </div>
  );
}
