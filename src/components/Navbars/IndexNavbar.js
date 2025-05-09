/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { FaSearch } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import logo from "../../assets/img/logo5.png"

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Vous pouvez appeler une fonction ici pour gérer la recherche
    // props.onSearch && props.onSearch(e.target.value);
  };

  return (
    <>
   <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 bg-black">



   <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start items-center">
  {/* Logo as a clickable image */}
  <Link to="/" className="flex items-center">
    <img
       src={logo}  // Replace with your logo image path
      alt="Logo"
      className="h-10 w-auto mr-2" // You can adjust the size as needed
    />
  </Link>

  {/* Title (optional, if you still want text next to the logo) */}
  <Link
    to="/"
    className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
  >
 
  </Link>

          {/* Bouton hamburger */}
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

          {/* Barre de recherche */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10 "
              />
            </div>
          </form>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <IndexDropdown />
            </li>
            <li className="flex items-center">
              <a
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://www.facebook.com/yesser.boubakri.31?locale=fr_FR"
                target="_blank"
              >
                <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                <span className="lg:hidden inline-block ml-2">Share</span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://x.com/BoubakriYesser"
                target="_blank"
              >
                <i className="text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                <span className="lg:hidden inline-block ml-2">Tweet</span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index-navbar"
                target="_blank"
              >
                <i className="text-blueGray-400 fab fa-github text-lg leading-lg " />
                <span className="lg:hidden inline-block ml-2">Star</span>
              </a>
            </li>

          </ul>
        </div>

      </nav>
    </>
  );
}
