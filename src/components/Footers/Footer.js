import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function Footer() {
  return (
    <>
      <footer className="custom-footer pt-8 pb-6 text-white ">



        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Contacter Nous sur :</h4>
              <div className="mt-6 flex justify-center lg:justify-start space-x-4 text-3xl" >
                <a
                  href="https://www.facebook.com/yesser.boubakri.31?locale=fr_FR"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  <FaFacebook className="text-2xl" />

                </a>
                <a
                  href="https://www.instagram.com/yesser.boubakri/"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  <FaInstagram className=" text-2xl" />

                </a>
                <a
                  href="https://www.linkedin.com/in/yesser-boubakri-49844634a/"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8">
            <hr className="mb-6" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="text-sm font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <span className="text-white">ZoomCar </span>.
              </div>
              <ul className="list-unstyled">
                <li>
                 
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
