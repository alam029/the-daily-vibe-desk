import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer-left">
            <Link to="/" className="navbar__brand">
                <span className="masthead-title">The Daily Vibe Desk</span>
                <span className="eyebrow navbar__tagline">EST. 2026 &#183; newsvibe</span>
            </Link>
        </div>
        <div className="footer-right">
          <p>
            Developed by &#9829; MD Manowar Alam &#183; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
