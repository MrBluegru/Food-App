import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, clearDetails } from "../redux/action";
import { Link } from "react-router-dom";
import Card from "./Card";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import Reloading from "./Reloading";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getRecipes());
    }
  }, [dispatch, allRecipes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allRecipes]);

  useEffect(() => {
    dispatch(clearDetails());
  });

  // creamos estados locales para paginado
  // estado con la pag actual y uno que setee la pag actual
  const [currentPage, setCurrentPage] = useState(1);
  // estado local con cuantas recetas a mostrar por pagina y setea las recetas por pagina
  const [recipesPerPage] = useState(9);
  // constante con el indice de la ultima receta que tengo en la pag
  const indexOfLastRecipes = currentPage * recipesPerPage;
  // constante con el indice de la primera receta
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  // constante con las recetas que estan en la pagina actual
  const currentRecipes = allRecipes.length
    ? allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes)
    : [];

  const paginado = (pageNum) => {
    setCurrentPage(pageNum); // seteo la pag actual
  };

  return (
    <div className="home">
      <div className="titulo">
        <Link className="linkS" to={"/"}>
          <h1>FOOD APP</h1>
        </Link>
      </div>

      <div className="navbar">
        <NavBar />
      </div>

      <div className="paginado">
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>

      <div className="cards">
        {error.length ? (
          <button>{error}</button>
        ) : currentRecipes.length > 1 ? (
          currentRecipes.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                image={e.image}
                name={e.name}
                diets={e.diets}
                healthScore={e.healthScore}
              />
            );
          })
        ) : (
          <Reloading />
        )}
      </div>
    </div>
  );
}
