import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";


const IndexDropdown = ({}) => {
 
  const [pagesShow, setPagesShow] = React.useState(false);

  
  

  const pagesBtnRef = React.createRef();
  const pagesRef = React.createRef();

  const toggleDropdown = (showSetter, refBtn, refDrop, showValue) => {
    if (showValue) {
      showSetter(false);
    } else {
      createPopper(refBtn.current, refDrop.current, {
        placement: "bottom-start",
      });
      showSetter(true);
    }
  };

  
  const user = JSON.parse(localStorage.getItem("user_9antra"));
  const userId = user ? user._id : null;

  return (
    <>
      {user && user.role === "admin" && (
  <>

  {user && user.role === "admin" && (
    <Link
      to="/admin/dashboard"
      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
    >
      <div className="flex items-center space-x-1 text-xl mr-4 uppercase">
        <span>Dashboard</span>
      </div>
    </Link>
  )}
</>

      )}

      <a
        href="#pages"
        ref={pagesBtnRef}
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown(setPagesShow, pagesBtnRef, pagesRef, pagesShow);
        }}
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
      >
    
      </a>
      <div
        ref={pagesRef}
        className={
          (pagesShow ? "block " : "hidden ") +
          "custom-dropdown text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 bg-white"
        }
      >
    

     
      </div>
    </>
  );
};

export default IndexDropdown;
