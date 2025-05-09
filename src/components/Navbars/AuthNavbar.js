/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa6";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className=" text-lightBlue-500 text-2xl boldfont- leading-relaxed inline-block mr-4 py-2 whitespace-nowrap flex items-center text-blueGray-700 text-sm font-bold "
              to="/"
            >
               <FaCar className="mr-2 text-lg text-black  text-2xl" />
              <div className="text-black"> ZoomCar </div>

            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >


          </div>
        </div>
      </nav>
    </>
  );
}
