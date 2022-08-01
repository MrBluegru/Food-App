import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName, getRecipes, clearError } from "../redux/action";
import "../styles/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    !e.target.value
      ? dispatch(getRecipes())
      : dispatch(getRecipesName(e.target.value));
    dispatch(clearError());
  }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     dispatch(getRecipesName(name));
  //     setName("");

  //   }
  //onClick={(e) => handleSubmit(e)}

  return (
    <div className="search_bar">
      <form>
        <input
          className="search_bar_input"
          type="text"
          value={name || ""}
          placeholder="🔎 Search for a recipe "
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {/* <button>Buscar</button> */}
      </form>
    </div>
  );
}
