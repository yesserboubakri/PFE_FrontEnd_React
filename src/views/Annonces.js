// src/views/CarDetails.js
import React from "react";
import { useParams } from "react-router-dom";

const carAnnonces = [
  {
    id: 1,
    title: "Peugeot 208 - 2020",
    image: "https://via.placeholder.com/400x250?text=Peugeot+208",
    price: "€10,500",
    mileage: "40,000 km",
    fuel: "Essence",
    year: 2020,
  },
  {
    id: 2,
    title: "Renault Clio - 2018",
    image: "https://via.placeholder.com/400x250?text=Renault+Clio",
    price: "€8,700",
    mileage: "60,000 km",
    fuel: "Diesel",
    year: 2018,
  },
  {
    id: 3,
    title: "Volkswagen Golf - 2019",
    image: "https://via.placeholder.com/400x250?text=VW+Golf",
    price: "€13,200",
    mileage: "50,000 km",
    fuel: "Essence",
    year: 2019,
  },
];

export default function Annonces() {
  const { id } = useParams();
  const car = carAnnonces.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="pt-32 text-center text-red-600 text-xl">
        Annonce non trouvée
      </div>
    );
  }

  return (
    <section className="pt-32 pb-16 bg-blueGray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <img
            src={car.image}
            alt={car.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold text-blueGray-700 mb-2">{car.title}</h2>
          <p className="text-orange-500 text-xl font-semibold mb-2">{car.price}</p>
          <ul className="text-blueGray-600 space-y-1">
            <li><strong>Année:</strong> {car.year}</li>
            <li><strong>Kilométrage:</strong> {car.mileage}</li>
            <li><strong>Carburant:</strong> {car.fuel}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
