import React, { useState } from "react";
import axios from "axios";
import { LuMail } from "react-icons/lu";
import { CgPassword } from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);

    try {
      const res = await axios.post("http://localhost:5000/users/login", formData);
      const { user, token } = res.data;

      localStorage.setItem("user_9antra", JSON.stringify(user));
      localStorage.setItem("token_9antra", token);

      console.log("Login successful", res.data);

      if (user.role === "admin") {
        history.push("/admin/Dashboard"); // redirection lel dash 
      } else {
        history.push("/MonEspace");
      }

    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="mr-auto w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className=" text-blueGray-400 text-center mb-3 font-bold mt-5">
                  <small>
                    <div className="text-black ">
                      <p className="">Connectez-vous avec vos identifiants</p>
                    </div>
                  </small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label className=" block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email
                    </label>
                    <div className="flex items-center border rounded bg-white px-2">
                      <LuMail className="text-blueGray-400 text-xl mr-2" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>


                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      mot de passe
                    </label>
                    <div className="flex items-center border rounded bg-white px-2">
                      <CgPassword className="text-blueGray-400 text-xl mr-2" />
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className=" custom-navbar bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>



            <div className="w-1/2 text-right">
              <Link to="/auth/register" className="text-blueGray-200">
                <small>Create new account</small>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
