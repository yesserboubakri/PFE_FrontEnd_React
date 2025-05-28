import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaGasPump, FaRoad, FaCalendarAlt, FaTrash, FaSearch, FaTimes, } from "react-icons/fa";
import { TbManualGearboxFilled } from "react-icons/tb";
import { QRCodeCanvas } from "qrcode.react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const carsPerPage = 9;

  const user = JSON.parse(localStorage.getItem("user_9antra"));

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/car/deleteCarById/${id}`);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/car/getAllCars");
      setCars(res.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleQuickSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    getCars();
  }, []);

  const filteredCars = cars.filter(car =>
    car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (car.marque?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (car.Annee?.toString().includes(searchTerm))
  );
//paget
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueBrands = [...new Set(cars.map(car => car.marque).filter(Boolean))].slice(0, 4);
  const currentYear = new Date().getFullYear();
  const recentYears = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <>
      <IndexNavbar fixed />
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundColor: "#f2e9d0" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(172, 198, 170, 0.5)' }} />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 mb-10 mt-20">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4"></div>
          </div>

          <section className="pb-16 bg-transparent relative pt-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10 animate-slide-fade-in">
                <h2 className="text-5xl font-extrabold text-gray-900 mb-2 uppercase tracking-wide">
                  Occasions à la une
                </h2>
                <p className="text-lg text-black font-medium mt-4 mb-2 uppercase">
                  Un grand choix de voitures d'occasion
                </p>
              </div>

            <div className="w-full max-w-2xl mx-auto px-4 py-8">
  <div className="relative flex items-center">
 
 
    {/* Input */}
    <input
      type="text"
      placeholder=" Rechercher une voiture ( modèle, année...)"
      value={searchTerm}
      onChange={e => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="
        w-full 
        py-4
        pl-12
        pr-24
        rounded-full
        bg-white
        text-lg
        font-medium
        text-black
        placeholder-gray-400
        shadow-xl
        outline-none
        focus:ring-2
        focus:ring-blue-400
        transition
        duration-200
        border-0
      "
      style={{
        boxShadow: '0 4px 18px rgba(60,60,80,0.08)',
        border: 'none'
      }}
    />
    {/* Clear Button */}
    {searchTerm && (
      <button
        onClick={clearSearch}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors duration-200 rounded-full p-2 bg-white"
        style={{ boxShadow: '0 1px 4px rgba(60,60,80,0.07)' }}
      >
        <FaTimes className="w-5 h-5" />
      </button>
    )}
    {/* Search Button */}
    <button 
      className=" ml-280 absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 px-4 py-3 transition-colors duration-200 flex items-center justify-center rounded-full shadow-lg"
      type="button"
      style={{ backgroundColor: "#ae0b0b" }}
    >
      <FaSearch className="w-5 h-5 text-white" />
    </button>
  </div>
</div>

              <div className="flex flex-wrap -mx-4 mt-8">
                {currentCars.length === 0 ? (
                  <div className="w-full text-center text-gray-600 mt-10">
                    <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-md">
                      <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-gray-800 mb-2">Aucune voiture trouvée</p>
                      <p className="text-gray-600 mb-4">
                        {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucune voiture disponible pour le moment"}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Effacer la recherche
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  currentCars.map((car) => (
                    <div
                      key={car._id}
                      className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8 mt-2"
                    >
                      <div
                        style={{ backgroundColor: "#dee1ec" }}
                        className="bg-white rounded-lg overflow-hidden soft-hover-effect front-shadow transform transition-transform duration-200 hover:scale-105"
                      >
                        <img
                          src={`http://localhost:5000/files/${car.Car_image[0]}`}
                          alt={car.model}
                          className="w-full h-kk object-cover"
                        />

                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col items-start">
                              <h3 className="text-xl font-bold text-black mb-1 uppercase">{car.model}</h3>
                              <p className="text-orange-500 font-semibold text-lg">{car.prix} DT</p>
                              {(user?.role === "admin" || user?._id === car.owner) && (
                                <button
                                  onClick={() => handleDeleteCar(car._id)}
                                  className="mt-2 bg-red-600 text-white rounded-full p-2 shadow hover:bg-red-700 hover:scale-110 transition-all duration-200"
                                  title="Supprimer"
                                >
                                  <FaTrash size={16} />
                                </button>
                              )}
                            </div>
                            <div className="flex flex-col items-center mr-8 mt-6">
                              <QRCodeCanvas
                                value={`http://localhost:3000/profile/${car._id}`}
                                size={70}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap text-sm text-black my-4 space-x-4">
                            <div className="flex items-center mr-4">
                              <FaRoad className="mr-1" /> {car.kilometrage} KM
                            </div>
                            <div className="flex items-center mr-4">
                              <FaGasPump className="mr-1" /> {car.fuel}
                            </div>
                            <div className="flex items-center mr-4">
                              <FaCalendarAlt className="mr-1" /> {car.Annee}
                            </div>
                            <div className="flex items-center mr-4">
                              <TbManualGearboxFilled className="mr-1" /> {car.boite}
                            </div>
                          </div>

                          <Link to={`/profile/${car._id}`}>
                            <button
                              style={{ backgroundColor: "#ae0b0b" }}
                              className="mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              Voir l'annonce
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* ---- Enhanced Pagination ---- */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-3 mt-8">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
                    }`}
                  >
                    Précédent
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 transform hover:scale-105 ${
                          currentPage === page
                            ? "text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                        style={currentPage === page ? { 
                          background: "linear-gradient(135deg, #ae0b0b 0%, #d41515 100%)",
                          boxShadow: "0 4px 15px rgba(174, 11, 11, 0.3)"
                        } : {}}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
                    }`}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}