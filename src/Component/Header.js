import React from "react";
import { Link } from "react-router-dom";
import logo from "../Image/logo.png";
import { useTranslation } from "react-i18next";
import Home2 from "../HRComponent/Company/Home_Campany";

export default function Header() {
  const { t, i18n } = useTranslation();
  const handlesubmit = (code) => {
    i18n.changeLanguage(code);
    console.log("SELECT", code);

    localStorage.setItem("language", code);
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 navBar">
      <div className="container-fluid">
        <a className="navbar-brand me-5" href="#">
          <img src={logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <Link to="/">
              {" "}
              <li className="nav-item navList">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </Link>
            <li className="nav-item navList">
              <Link to="/about" className="nav-link" href="#">
                About Us
              </Link>
            </li>
            <Link to='/Vacancy'> <li className="nav-item navList">
              <a className="nav-link" href="#">
                Vacancies
              </a>
            </li></Link>
            <li className="nav-item   dropList dropdown">
              <Link
                to="/Services"
                className="nav-link dropdown-toggle"
                style={{ color: "#000" }}
                href=" "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Our Services
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/fixitfinder" className="dropdown-item">
                    Fixit Finder
                  </Link>
                </li>
                <li>
                  <Link to="/hrconsultancy" className="dropdown-item">
                    HR Consultancy
                  </Link>
                </li>
                <li>
                  <Link to="/traingdev" className="dropdown-item">
                  Learning  and Development
                  </Link>
                </li>
                <li>
                  <Link to="/elitefemale" className="dropdown-item">
                  Elite Female Talent Pool 
                  </Link>
                </li>
                <li>
                  <Link to="/acadmiccredintial" className="dropdown-item">
                  Academic Credential Verifier
                  </Link>
                </li>
                {/* <li>
                  <Link to="/" className="dropdown-item">
                    Recruitment and Selection
                  </Link>
                </li> */}
                {/* <li>
                  <a className="dropdown-item">
                    Employee Outsourcing
                  </a>
                </li> */}
                <li>
                  <Link to="/teleconsult" className="dropdown-item">
                    HR Teleconsultation
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item navList">
              <Link to="/basiclabourtool" className="nav-link">
                Basic Labour Tools
              </Link>
            </li>
            <li className="nav-item navList">
              <Link to="/onlinecourse" className="nav-link">
                Online Courses
              </Link>
            </li>
            <Link to="/Blog">
              <li className="nav-item navList">
                <a className="nav-link">Blog</a>
              </li>
            </Link>

            <Link to="/ContentAs">
              {" "}
              <li className="nav-item navList">
                <a className="nav-link">Contact Us</a>
              </li>
            </Link>
            {/* <li className="nav-item   dropList dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  style={{ color: "#000" }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Registor
                    </a>
                  </li>
                </ul>
              </li> */}
          </ul>
          <div className="hedder-button">
            {/* <Link to=''><a className="h-btn h-btn-green" href="/application-form">
              {" "}
              <i className="fi fi-sr-cloud-upload-alt" /> Upload Cv{" "}
            </a> </Link> */}
            <Link
              to="/Home2"
              className="b-btn job_area_btn"
              href=" "
            >
              {/* <i className="fi fi-rr-circle-user" /> */}
              Employers / Post Job
            </Link>
          </div>
          {/* <div className="hedder-button">
              <Link to='/SignUp' className="b-btn job_area_btn" href="/register">
                <i className="fi fi-rr-circle-user" /> Sign In
              </Link >
              <a className="h-btn h-btn-green" href="/application-form">
                {" "}
                <i className="fi fi-sr-cloud-upload-alt" /> Upload Cv{" "}
              </a>
            </div> */}
        </div>
      </div>
    </nav>
  );
}
