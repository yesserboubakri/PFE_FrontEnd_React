import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAllUsers } from "services/ApiUser";
import { deleteUserById } from "services/ApiUser";
import { addUserClient } from "services/ApiUser";
import { addUserAdmin } from "services/ApiUser";
import { LuCirclePlus } from "react-icons/lu";

import { updateuserById } from "services/ApiUser";

export default function CardTable({ color }) {
  const [newUser, setNewUser] = useState({
    username: "", age: "", email: "", password: "", role: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res && res.data && res.data.userListe) {
        setUsers(res.data.userListe);
        console.log(res.data);
      } else {
        console.warn("userList not found in response:", res);
        setUsers([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      setUsers([]);
    }
  };

  const handleupdate = async () => {
    try {
      await updateuserById(newUser, newUser._id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getUsers(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };
const AjouterUser = async () => {
  try {
    const data = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      age: newUser.age,
      role: newUser.role || 'client'
    };

    const url =
      newUser.role === 'admin'
        ? 'http://localhost:5000/users/addUserAdmin'
        : 'http://localhost:5000/users/addUserClient';

    const response = await axios.post(url, data);

    console.log('Utilisateur ajouté :', response.data);
    
getUsers(); // rafraîchir la liste
  } catch (error) {
    console.error('Erreur lors de l’ajout de l’utilisateur :', error.response?.data || error.message);
  }
};

  return (
    <>
      {isModalOpen && (
        <div className=" custmb-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-24 flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 space-y-5 p-6 bg-white rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold text-green-700 mb-4 border-b pb-2">Ajouter un Utilisateur</h4>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  onChange={handleChange}
                  value={newUser.username}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 bg-white hover:bg-green-50"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={newUser.email}
                  className=" mt-4 front-shadow block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 bg-white hover:bg-green-50"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  value={newUser.age}
                  className="mt-4 block front-shadow w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 bg-white hover:bg-green-50"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  className=" mt-4 front-shadow  block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 bg-white hover:bg-green-50"
                />
              </div>

              <select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                className=" mt-4 block  w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300 bg-white hover:bg-green-50"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="button"
              onClick={  ()=>{AjouterUser();
                setIsModalOpen(false);
              }}
              style={{ backgroundColor: "#4ef037" }}
              className="w-full mt-6 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Ajouter un utilisateur
            </button>

            <button
              type="button"
              onClick={async () => {
                await handleupdate();
                setIsModalOpen(false);
              }}
              style={{ backgroundColor: "#4756ca" }}
              className="w-full mt-6 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 active:bg-green-700 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              moddifier un utilisateur
            </button>
          </div>
        </div>
      )}

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg " +
          (color === "light" ? "bg-white" : "bg-black text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                LISTE UTILISATEUR
              </h3>

              <button

                className="text-3xl flex items-center hover:text-green-600 transition-colors duration-300"
                onClick={() => {
                  setNewUser({ username: "", age: "", email: "", password: "", role: "" });
                  setIsModalOpen(true);
                }}
              >
                <LuCirclePlus className="mr-2" /> Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto" style={{ backgroundColor: "#a7b99e" }}>
          <table className="items-center w-full bg-transparent border-collapse rounded-lg">
            <thead>
              <tr className={color === "light" ? "bg-green-200" : "bg-green-700"}>
                {["Nom et Prénom", "Age", "Email", "Created at", " role", " moddifier", "Supprimer "].map((title, idx) => (
                  <th
                    key={idx}
                    className={
                      "px-6 py-3 text-xs font-semibold text-left uppercase tracking-wider " +
                      (color === "light" ? "text-green-900" : "text-green-100 text-black")
                    }
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={
                    (index % 2 === 0 ? (color === "light" ? "bg-green-50 " : "bg-green-900 text-black ") : "") +
                    " hover:bg-green-100 transition-colors duration-200"
                  }
                >
                  <th className="px-6 py-4 text-xs font-bold text-left flex items-center whitespace-nowrap ">
                    <img
                      src={`http://localhost:5000/files/${user.user_image || 'user.jpg'}`}
                      alt="profile"
                      className="h-12 w-12 rounded-full border bg-white mr-3 "
                    />
                    <span className={color === "light" ? "text-green-900" : "text-green-200 text-black"}>{user.username}</span>
                  </th>

                  <td className={"px-6 py-4 text-xs " + (color === "light" ? "text-green-800 text-black" : "text-green-100 text-black ")}>
                    {user.age}
                  </td>
                  <td className={"px-6 py-4 text-xs " + (color === "light" ? "text-green-800 text-black" : "text-green-100 text-black")}>
                    {user.email}
                  </td>
                  <td className={"px-6 py-4 text-xs " + (color === "light" ? "text-green-800 text-black" : "text-green-100 text-black")}>
                    {user.createdAt}
                  </td>

                  <td className={"px-6 py-4 text-xs " + (color === "light" ? "text-green-800 text-black" : "text-green-100 text-black")}>
                    {user.role}
                  </td>

                  <td className="px-6 py-4 text-black">
                    <button
                      onClick={async () => {
                        setNewUser(user);
                        setIsModalOpen(true);
                      }}
                      style={{ backgroundColor: "#1E40AF" }}
                      className="bg-blue-500 hover:bg-black-600 text-white font-semibold text-xs px-4 py-2 rounded shadow transition-colors duration-200"
                      type="button"
                    >
                      moddifier
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        await deleteUser(user._id);
                      }}
                      className="bg-red-500 text-white font-semibold text-xs px-4 py-2 rounded shadow transition-colors duration-200 mr-2"
                      type="button"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}
