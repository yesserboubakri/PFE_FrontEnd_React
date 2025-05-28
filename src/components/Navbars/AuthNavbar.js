
import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import logo from "../../assets/img/lhamdoula.png";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);


  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 custom-navbar ">
    
        <div className="flex items-center justify-start w-full lg:w-auto ml-2 text-5xl" >
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 w-auto mr-2 " />
          </Link>
        </div>

       
        <button
          className="cursor-pointer text-xl leading-none px-3 py-1 border border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

       
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none transition-all duration-300 ease-in-out" +
            (navbarOpen ? " block" : " hidden")
          }
        >
       

     
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
        <li className="flex items-center text-xl mr-8 uppercase">
               <Link
                 to="/"
                 className=""
               >
                 Accueil
               </Link>
 
             </li>
                   
            <li className="flex items-center">
              <IndexDropdown />
            </li>

      
            <li className="flex items-center mt-12">
              <Link
                to="/auth/login"
                className="text-white text-sm px-4 py-2 flex items-center font-bold hover:text-blue-400"
              >
                <i className="fas fa-sign-in-alt mr-2 "></i> Login
              </Link>
            </li>

            <li className="flex items-center mt-12">
              <Link
                to="/auth/register"
                className="text-white text-sm px-4 py-2 flex items-center font-bold hover:text-blue-400"
              >
                <i className="fas fa-user mr-2"></i> Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
