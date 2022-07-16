import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

export default function LandingPage() {
  return (
    <div className="landingPage">
      <h1 className="letras">Welcome to Food App</h1>
      <Link to="/home">
        <button className="btn-start">Start</button>
      </Link>
      <div>
        <div className="link-name" href="https://www.linkedin.com/in/mrbluegru/" target="_blank" rel="noreferrer"> by Mr. Blue </div>
      </div>
    </div>
  );
}

