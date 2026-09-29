import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="site-nav">
        <div className="nav-inner">
          <NavLink to="/" className="brand">
            Bhavani <span className="dot">Suresh</span>
          </NavLink>

          <ul className={menuOpen ? "nav-links active" : "nav-links"}>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/skills" onClick={() => setMenuOpen(false)}>
                Skills
              </NavLink>
            </li>

            <li>
              <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
                Projects
              </NavLink>
            </li>

            <li>
              <NavLink to="/certificates" onClick={() => setMenuOpen(false)}>
                Certificates
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;