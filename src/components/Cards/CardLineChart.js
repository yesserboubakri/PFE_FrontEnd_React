import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import axios from "axios";
import { getCarCountByDay } from "../../services/ApiDashbored"; 
import { getUserCountByDay } from "../../services/ApiDashbored"; 


export default function CardLineChart() {
  const [days, setDays] = useState([]);
  const [carCounts, setCarCounts] = useState([]);
  const [userCounts, setUserCounts] = useState([]);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const carRes = await getCarCountByDay();
      const userRes = await getUserCountByDay();

      const dayLabels = carRes.map(item => item.day);  
      const carData = carRes.map(item => item.count);
      const userData = userRes.map(item => item.count);

      setDays(dayLabels);
      setCarCounts(carData);
      setUserCounts(userData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  fetchStats();
}, []);


  useEffect(() => {
    if (days.length === 0 || carCounts.length === 0 || userCounts.length === 0) return;

    const config = {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Voitures ajoutées",
            backgroundColor: "transparent",
            borderColor: "#000000", //ak7el
            data: carCounts,
            fill: false,
            borderWidth: 2,
          },
          {
            label: "Utilisateurs ajoutés",
            fill: false,
            backgroundColor: "transparent",
            borderColor: "#b91c1c", //a7mer
            data: userCounts,
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: "#000000", 
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#000000", 
                maxRotation: 45,
                minRotation: 45,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Jours",
                fontColor: "#000000", 
              },
              gridLines: {
                display: false,
                color: "rgba(0,0,0,0.1)",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "#000000", 
                beginAtZero: true,
                precision: 0,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Nombre",
                fontColor: "#000000", //ak7el
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
          },
        },
      },
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    if (window.myLine) window.myLine.destroy();
    window.myLine = new Chart(ctx, config);
  }, [days, carCounts, userCounts]);
return (
  <div
    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    style={{ backgroundColor: "#dee2e6" }}
  >
    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h6 className="uppercase text-gray-900 mb-1 text-xs font-semibold">
            Statistiques
          </h6>
          <h2 className="text-gray-900 text-xl font-semibold">
            Voitures & utilisateurs par jour
          </h2>
        </div>
      </div>
    </div>
    <div className="p-4 flex-auto">
      {/* Chart */}
      <div className="relative" style={{ height: "400px" }}>
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
);
}
