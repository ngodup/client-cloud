import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; {currentYear} Cuisine en nuage. Tous droits réservés.
        </p>
        <ul className="footer-links">
          <li>
            <a href="/gallery">Gallery</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
