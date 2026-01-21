import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      <p className="notfound-message">Sorry, the page you are looking for does not exist.</p>
      <button className="notfound-btn" onClick={() => navigate('/')}>Go to Homepage</button>
    </div>
  );
};

export default NotFound;
