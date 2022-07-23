import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

export default function LandingPage() {
  return (
    <div className="landingPage">
      <div>
        <h1 className="letras">Welcome to Food App</h1>
      </div>

      <div>
        <Link className="linkS" to="/home">
          <button className="btn-start">Start</button>
        </Link>
      </div>

      <div>
        <a
          className="link-name"
          href="https://www.linkedin.com/in/mrbluegru/"
          target="_blank"
          rel="noreferrer"
        >
          by Mr. Blue
        </a>
      </div>
    </div>
  );
}
