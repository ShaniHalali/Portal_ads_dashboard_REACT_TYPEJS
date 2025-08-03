import "./Dashboard.css";
import Header from "../components/Header";
import ClickVsViewChart from "../components/ClickVsViewChart";
import StatsOverview from "../components/StatsOverview";
import AdStatsPie from "../components/AdStatsPie";
import TopClickedAds from "../components/TopClickedAds";

function Dashboard() {
  return (
    <>
      <Header />
      <main className="dashboard-main">
        <div className="div-stats-overview">
          <StatsOverview />
        </div>

        <ClickVsViewChart />

        <div className="div-pie-and-topclicks">
          <AdStatsPie />
          <TopClickedAds />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
