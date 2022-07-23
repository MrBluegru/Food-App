import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/action";
import Card from "./Card";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);


  // creamos estados locales para paginado
  // estado con la pag actual y uno que setee la pag acctual
  const [currentPage, setCurrentPage] = useState(1);
  // estado local con cuantos paises mostrar por pagina y setea los paises por pagina
  const [recipesPerPage, setRecipesPerPages] = useState(9);
  // constante con el indice del ultimo pais que tengo en la pag
  const indexOfLastRecipes = currentPage * recipesPerPage;
  // constante con el indice del primer personaje
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  // constante con los paises que estan en la pagina actual
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipes,
    indexOfLastRecipes
  );

  const paginado = (pageNum) => {
    setCurrentPage(pageNum); // seteo la pag actual
  };


  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

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
        />
      </div>

      <div className="cards">
        {currentRecipes?.map((e) => {
          return (
            <Card
              key={e.id}
              id={e.id}
              image={e.image}
              name={e.name}
              diets={e.diets}
            />
          );
        })}
      </div>
    </div>
  );
}
