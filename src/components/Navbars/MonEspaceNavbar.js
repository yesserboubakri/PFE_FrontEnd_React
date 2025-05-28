import React from "react";
import { Link } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import logo from "../../assets/img/lhamdoula.png";


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);



  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 custom-navbar">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start items-center">
          <Link to="/" className="flex items-center xl ml-2">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-auto mr-2 text-3xl"
            />
          </Link>

          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (navbarOpen ? " block" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center text-xl mr-8 uppercase">
              <Link to="/">Accueil</Link>
            </li>
            <li className="flex items-center text-xl mr-4 uppercase">
              <Link to="/MonEspace">Mon Espace</Link>
            </li>
            <li className="flex items-center">
              <IndexDropdown />
            </li>

            <li className="flex items-center mt-12">
              <Link
                to="/auth/login"
              >
                <i className="fas fa-sign-in-alt mr-2"></i> logout
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}
