import React from "react";
import "../styles/paginado.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
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
              <button onClick={() => paginado(number)}>
                {number}
              </button>
            </div>
          ))}
      </div>
    </nav>
  );
}
