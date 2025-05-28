import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { getCarCountByDay, getUserCountByDay } from "../../services/ApiDashbored";

export default function CardLineChart() {
  const [days, setDays] = useState([]);
  const [carCounts, setCarCounts] = useState([]);
  const [userCounts, setUserCounts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const carRes = await getCarCountByDay();
        const userRes = await getUserCountByDay();

        const carMap = Object.fromEntries(carRes.map(item => [item.day, item.count]));
        const userMap = Object.fromEntries(userRes.map(item => [item.day, item.count]));

        const uniqueDays = Array.from(new Set([
          ...carRes.map(item => item.day),
          ...userRes.map(item => item.day),
        ])).sort((a, b) => a - b);

        const carData = uniqueDays.map(day => carMap[day] || 0);
        const userData = uniqueDays.map(day => userMap[day] || 0);

        setDays(uniqueDays.map(String));
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

    const ctx = document.getElementById("line-chart").getContext("2d");

    const gradientBlack = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBlack.addColorStop(0, "#000000");
    gradientBlack.addColorStop(1, "#4B5563");

    const gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRed.addColorStop(0, "#DC2626");
    gradientRed.addColorStop(1, "#F87171");

    const config = {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Voitures ajoutées",
            data: carCounts,
            fill: false,
            borderColor: gradientBlack,
            backgroundColor: "#000000",
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          },
          {
            label: "Utilisateurs ajoutés",
            data: userCounts,
            fill: false,
            borderColor: gradientRed,
            backgroundColor: "#DC2626",
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#111827",
              font: {
                size: 14,
                family: "Inter, sans-serif",
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#111827",
            bodyColor: "#111827",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            padding: 12,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#374151",
              font: {
                size: 12,
                family: "Inter, sans-serif",
              },
            },
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "Jours",
              color: "#111827",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#374151",
              stepSize: 1,
              font: {
                size: 12,
                family: "Inter, sans-serif",
              },
            },
            grid: {
              color: "#e5e7eb",
              borderDash: [5, 5],
            },
            title: {
              display: true,
              text: "Nombre",
              color: "#111827",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    };

    if (window.myLine) window.myLine.destroy();
    window.myLine = new Chart(ctx, config);
  }, [days, carCounts, userCounts]);

  return (
    <div     style={{ backgroundColor: "#dee2e6" }}
     className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white ">
      <div     style={{ backgroundColor: "#dee2e6" }} className="rounded-t mb-0 px-6 py-4 bg-white border-b border-gray-200">
        <div  
        className="flex flex-wrap items-center">
          <div
           className="w-full ">
            <h6 className="uppercase text-gray-600 mb-1 text-xs font-semibold">
              Statistiques
            </h6>
            <h2  className="text-gray-800 text-xl font-semibold">
              Voitures & utilisateurs par jour
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative" style={{ height: "400px" }}>
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
