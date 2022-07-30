import React from "react";
import "../styles/paginado.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            
            <div key={number} className="page-item">
              <button  
              onClick={() => paginado(number)} 
              key={number} 
              className={number === currentPage ? "current" : "rest"}>
                {number}
              </button>
            </div>
          ))}
      </div>
    </nav>
  );
}
