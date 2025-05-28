import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { LuMail, LuCheck, LuX, LuUpload } from "react-icons/lu"; 
import { CgPassword } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbNumber18Small } from "react-icons/tb";
import axios from "axios";

export default function Register() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    image: null,
  });

  // Add missing states and refs for image upload UI
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Event handlers for drag and drop area
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  // Existing handlers unchanged:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, age, image } = formData;

    if (!username || !email || !password || !age) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("age", age);
      if (image) {
        data.append("user_image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/users/addUserClientWithImg",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsUploading(false);
      console.log(response.data);
      alert("Compte créé avec succès !");
      history.push("/auth/login");
    } catch (error) {
      setIsUploading(false);
      console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
      alert("Échec de la création du compte.");
    }
  };

  return (
    <div className="container mx-auto px-4 h-full ">
      <div className="flex content-center items-center justify-center h-full ">
        <div className="mr-auto w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 ">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold mt-5">
                <div className="text-black">
                  <small>Inscrivez-vous avec vos identifiants</small>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    nom et Prénom
                  </label>
                  <div className="flex items-center border rounded bg-white px-2">
                    <MdDriveFileRenameOutline className="text-blueGray-400 text-xl mr-2" />
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nom d'utilisateur"
                    />
                  </div>
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
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
                      placeholder="Mot de passe"
                    />
                  </div>
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Age
                  </label>
                  <div className="flex items-center border rounded bg-white px-2">
                    <TbNumber18Small className="text-blueGray-400 text-xl mr-2 text-3xl" />
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Âge"
                    />
                  </div>
                </div>

                {/* Image upload */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Photo de profil (optionnel)
                  </label>

                  <div
                    className={`
                      relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer
                      ${isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : imagePreview
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                      }
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleImageClick}
                  >
                    <input
                      ref={fileInputRef}
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <div className="text-center">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Aperçu"
                              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {isUploading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              </div>
                            )}
                            {!isUploading && (
                              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                                <LuCheck size={10} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-700">
                              {formData.image?.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formData.image && (formData.image.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <LuX size={12} />
                            Supprimer
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="bg-white p-3 rounded-full shadow-sm">
                              <LuUpload className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Cliquez pour télécharger une image
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="custom-navbar bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    type="submit"
                    disabled={isUploading}
                  >
                    {isUploading ? "Chargement..." : "Créer un compte"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/forget" className="text-blueGray-200">
                <small>Mot de passe oublié ?</small>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/login" className="text-blueGray-200">
                <small>Se connecter</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
