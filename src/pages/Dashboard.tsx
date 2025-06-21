import Header from "../components/Header";
import ClickVsViewChart from "../components/ClickVsViewChart";
import StatsOverview from "../components/StatsOverview";
import AdStatsPie from "../components/AdStatsPie";
import TopClickedAds from "../components/TopClickedAds";

function Dashboard() {
  return (
    <>
      <Header />
      <main style={{ padding: "32px" }}>
        <div
          style={{
            display: "flex",
            gap: "20px 10px",
            flexWrap: "wrap",
            marginBottom: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StatsOverview />
        </div>

        <ClickVsViewChart />
        <div style={{ paddingLeft: 0 }}>
          <div
            style={{
              display: "flex",
              gap: "300px",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              backgroundColor: '#ffff'
            }}
          >
            <AdStatsPie />
            <TopClickedAds />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
