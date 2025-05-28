import React, { useState } from 'react';
import { AddCar } from '../services/ApiCar';
import MonEspaceNavbar from "components/Navbars/MonEspaceNavbar";
import Footer from "components/Footers/Footer.js";
import { FaCar } from 'react-icons/fa';
import { Car, Camera, Upload, Loader2 } from "lucide-react";

export default function MonEspace() {
  const user = JSON.parse(localStorage.getItem("user_9antra"));

  const [formData, setFormData] = useState({
    model: '',
    prix: '',
    description: '',
    kilometrage: '',
    fuel: '',
    Annee: '',
    boite: '',
    etat: '',
    images: [],
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      setError("Utilisateur non authentifié.");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach(img => data.append('Car_image', img));
      } else {
        data.append(key, value);
      }
    });

    data.append("owner", user._id);

    try {
      await AddCar(data);
      setSuccess('Annonce ajoutée et affectée avec succès !');
      setError('');
      setFormData({
        model: '',
        prix: '',
        description: '',
        kilometrage: '',
        fuel: '',
        Annee: '',
        boite: '',
        etat: '',
        images: [],
      });
      setPreviewImages([]);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout de l'annonce.");
      setSuccess('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MonEspaceNavbar fixed />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(172, 198, 170, 0.5)' }} />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-red-500 sm:text-4xl mt-8 ">
              Publier une nouvelle annonce
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Remplissez les détails de votre voiture pour le mettre en vente
            </p>
          </div>

          {success && <div className="mb-8 p-4 bg-green-100 text-green-800">{success}</div>}
          {error && <div className="mb-8 p-4 bg-red-100 text-red-800">{error}</div>}

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="px-6 py-5">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FaCar className="mr-2 text-2xl text-blue-500" />
                  Informations du voiture
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {["model", "prix", "kilometrage", "Annee"].map((field) => (
                    <div key={field} className="sm:col-span-3">
                      <label className="block text-xl uppercase font-bold text-gray-700 mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={
                          field === "prix" || field === "kilometrage" || field === "Annee"
                            ? "number"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={
                          field === "model" ? "Ex: Renault Clio" :
                          field === "prix" ? "Prix en DT" :
                          field === "kilometrage" ? "Kilométrage en km" :
                          field === "Annee" ? "Année de fabrication" :
                          ""
                        }
                        className="w-full p-2 border rounded front-shadow mb-2"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-3">
                    <label className="block text-sm text-xl font-medium uppercase text-gray-700 mb-2">Type de carburant</label>
                    <select name="fuel" value={formData.fuel} onChange={handleChange} required className="mb-2 w-full p-2 border rounded front-shadow">
                      <option value="">Sélectionner</option>
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700c text-xl uppercase mb-2">Boîte de vitesse</label>
                    <select name="boite" value={formData.boite} onChange={handleChange} required className="mb-2 w-full p-2 border rounded front-shadow">
                      <option value="">Sélectionner</option>
                      <option value="manuelle">Manuelle</option>
                      <option value="automatique">Automatique</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 text-xl uppercase mb-2">État</label>
                    <select name="etat" value={formData.etat} onChange={handleChange} required className="mb-2 w-full p-2 border rounded front-shadow">
                      <option value="">Sélectionner</option>
                      <option value="Neuf">Neuf</option>
                      <option value="Très bon">Très bon</option>
                      <option value="Bon">Bon</option>
                      <option value="Moyen">Moyen</option>
                      <option value="À réparer">À réparer</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700 text-xl uppercase mb-2">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Décrire ton véhicule ici..."
                      className="w-full p-2 border rounded front-shadow"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50">
                <div className="flex items-center mb-8">
                  <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                    <Camera className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Photos du véhicule</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
                      </div>
                      <input
                        type="file"
                        name="Car_image"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>

                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {previewImages.map((src, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={src || "/placeholder.svg"}
                            alt={`Preview ${i + 1}`}
                            className="h-32 w-full object-cover rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 py-6 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-500"></div>
                  <button
                    style={{ backgroundColor: "#ff0000" }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white transition-all duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Publication en cours...
                      </>
                    ) : (
                      <>
                        <Car className="-ml-1 mr-3 h-5 w-5 ml-09" />
                        Publier l'annonce
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
