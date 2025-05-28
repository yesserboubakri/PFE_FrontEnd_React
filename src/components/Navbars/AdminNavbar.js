import React from "react";
export default function Navbar() {
  return (
    <>

      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 bg-black">
        
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">

          
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
        
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3 mt-16">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            
              </span>
        
            </div>
          </form>
       
         
        </div>
      </nav>
      
    </>
  );
}
