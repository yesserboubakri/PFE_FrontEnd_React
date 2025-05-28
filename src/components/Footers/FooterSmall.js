import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800 custom-navbar "
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}

              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">

              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <div className="text-white  font-semibold italic tracking-wide mt-1 " >
                  Contacter Nous Sur :
                </div>

                <li>
                  <a
                    href="https://www.linkedin.com/in/yesser-boubakri-49844634a/"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/yesser.boubakri.31?locale=fr_FR"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    <FaFacebook className="text-2xl" />

                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/yesser.boubakri/"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    <FaInstagram className=" text-2xl" />

                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
