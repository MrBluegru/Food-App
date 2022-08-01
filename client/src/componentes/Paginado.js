import React from "react";
import "../styles/paginado.css";

export default function Paginado({
  recipesPerPage,
  allRecipes,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  let pageLength = pageNumbers.length;

  return (
    <nav>
      <div className="pagination">
        <div  className="page-item">
          <button
            className="nex-previous"
            onClick={() =>
              paginado(currentPage === 1 ? currentPage : currentPage - 1)
            }
          >{`<<<`}</button>
          {pageNumbers?.map((e) => {
            return (
              <button
                onClick={() => paginado(e)}
                key={e}
                className={e === currentPage ? "current" : "rest"}
              >
                {e}
              </button>
            );
          })}
          <button
            className="nex-previous"
            onClick={() =>
              paginado(currentPage === pageLength ? currentPage : currentPage + 1)
            }
          >{`>>>`}</button>
        </div>
      </div>
    </nav>
  );
}

/*

*/
