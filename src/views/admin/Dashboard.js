// Components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";

export default function Dashboard() {
  return (
    <div style={{ backgroundColor: "#dee2e6", minHeight: "100vh", padding: "20px" }}>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
    </div>
  );
}
