import React from "react";

const Navbar = () => {
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar position-fixed navbar-expand-md navbar-dark swing-in-top-fwd">
        <div className="container-xxl">
          <a className="text-decoration-none" href="/">
            <span className="h5">Krian</span>
          </a>

          {/* toggle button for mobile nav */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* navbar links */}
          <div
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a
                  className="nav-link text-white swing-in-top-fwd-home"
                  href="#landing"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white swing-in-top-fwd-projects"
                  href="#projects"
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white swing-in-top-fwd-about"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white swing-in-top-fwd-tools"
                  href="#tools"
                >
                  Tools
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white swing-in-top-fwd-contact"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* End */}
    </>
  );
};

export default Navbar;
