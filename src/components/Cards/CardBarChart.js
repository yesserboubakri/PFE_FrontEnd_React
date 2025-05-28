import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from "axios";
import { getCarCountPerUser } from "../../services/ApiDashbored"; 

export default function CardBarChart() {
  const [carCounts, setCarCounts] = useState([]);
  const [usernames, setUsernames] = useState([]);

useEffect(() => {
  const fetchCarCounts = async () => {
    try {
      const res = await getCarCountPerUser(); 
      const labels = res.map(item => item.username);
      const counts = res.map(item => item.carCount);

      setUsernames(labels);
      setCarCounts(counts);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
    }
  };

  fetchCarCounts();
}, []);

  useEffect(() => {
    if (usernames.length === 0 || carCounts.length === 0) return;

    const ctx = document.getElementById("bar-chart").getContext("2d");
    if (window.myBar) window.myBar.destroy();

    window.myBar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: usernames,
        datasets: [
          {
            label: "Nombre de voitures",
            backgroundColor: "#c82121",
            borderColor: "#f56565",
            data: carCounts,
            barThickness: 20,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: { fontColor: "rgba(0,0,0,.4)" },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: { color: "rgba(33, 37, 41, 0.3)" }
          }],
          yAxes: [{
            display: true,
            gridLines: { color: "rgba(33, 37, 41, 0.2)" },
            ticks: { beginAtZero: true, precision: 0 }
          }],
        },
      },
    });
  }, [usernames, carCounts]);
return (
  <div
    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded mt-18"
    style={{ backgroundColor: "#dee2e6" }}
  >
    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
      <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Statistiques</h6>
      <h2 className="text-blueGray-700 text-xl font-semibold">Nombre de voitures par utilisateur</h2>
    </div>

    <div className="p-4 flex-auto">
      <div className="relative h-96">
        <canvas id="bar-chart"></canvas>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nom d'utilisateur</th>
              <th className="px-4 py-2 border">Nombre de voitures</th>
            </tr>
          </thead>
          <tbody>
            {usernames.map((username, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{username}</td>
                <td className="px-4 py-2 border">{carCounts[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}