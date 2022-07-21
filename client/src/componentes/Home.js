import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/action";
import Card from "./Card";
import NavBar from "./NavBar";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="titulo">
        <h1>FOOD APP</h1>
      </div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="cards">
        {recipes?.map((e) => {
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
