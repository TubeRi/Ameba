import React from "react";
import "./Footer.css";

const Footer = ({ onAbout }) => (
  <footer className="footer-section">
    <div className="footer-contact">
      <h2>Contacts</h2>
      <p>If have any questions or feedback - contact us!</p>
    </div>
    <div className="footer-credits">
      <button className="footer-credits-btn" onClick={onAbout}>
        <span role="img" aria-label="fox" className="footer-fox">🦊</span> Contact Us
      </button>
    </div>
    <div className="footer-legal">
      <p>Terms of service bla bla bla pfpsp legal action copyright</p>
      <strong>AMEBA</strong>
    </div>
  </footer>
);

export default Footer;
