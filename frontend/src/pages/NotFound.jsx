import React from "react";
import "./NotFound.css";

const NotFound = ({ onBackHome }) => (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <h2 className="notfound-subtitle">Page Not Found</h2>
    <p className="notfound-message">Sorry, the page you are looking for does not exist.</p>
    <button className="notfound-btn" onClick={onBackHome}>Go to Homepage</button>
  </div>
);

export default NotFound;
