import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";


import { getUserCountByDay } from "../../services/ApiDashbored"; 
import { getCarCountByDay } from "../../services/ApiDashbored";   

export default function HeaderStats() {
  const [userCount, setUserCount] = useState(0);
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const data = await getUserCountByDay(); 
       
        const totalUsers = data.reduce((acc, curr) => acc + curr.count, 0);
        setUserCount(totalUsers);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    }

    async function fetchCarCount() {
      try {
        const data = await getCarCountByDay(); 
        const totalCars = data.reduce((acc, curr) => acc + curr.count, 0);
        setCarCount(totalCars);
      } catch (error) {
        console.error("Failed to fetch car count:", error);
      }
    }

    fetchUserCount();
    fetchCarCount();
  }, []);

  return (
    <>
      <div className=" relative bg-red-500 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <CardStats
                  statSubtitle="nombre d'utilisateurs"
                  statTitle={userCount.toLocaleString()}
                  statArrow="down"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full mt-4">
                <CardStats
                  statSubtitle="nombre de voitures" 
                  statTitle={carCount.toLocaleString()}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
