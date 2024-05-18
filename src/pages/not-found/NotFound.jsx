import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">
        Oops! The page you're looking for has disappeared into the universe.
      </p>
      <img src="./404.jpg" alt="Space-themed" className="not-found-image" />{" "}
      <a href="/" className="btn">
        Back to Home
      </a>
    </div>
  );
}

export default NotFound;
