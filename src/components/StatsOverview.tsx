import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";

const StatsOverview = () => {
  const [statCount, setStats] = useState({
    totalClicks: 0,
    totalCompletedViews: 0,
    totalViews: 0,
  });

  const [loading, setLoading] = useState(true);

function renderValue(value: number, loading: boolean): string {
  if (loading) {
    return "Loading...";
  }
  return value.toString();
}

function getRate (loading: boolean, totalViews: number = 0,totalCompletedViews: number = 0 ) : string {
  if (loading){
        return "Loading...";

  }else if (totalViews > 0){
    const pressent = ((totalCompletedViews ?? 0) / totalViews) * 100;
    return pressent.toFixed(1) + "%"
  }else{
    return "0%"
  }

}


  useEffect(() => {
    axios
      .get("https://ad-sdk-flask-api.vercel.app/ad_sdk/AdClickStats/summary")
      .then((res) => {
        setStats({
          totalClicks: res.data.total_clicks,
          totalCompletedViews: res.data.total_completed_views,
          totalViews: res.data.total_views,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch stats", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <StatCard
        label="Total Views"
        value={renderValue(statCount.totalViews ,loading)} 
        icon="👁️"
      />
      <StatCard
        label="Total Clicks"
        value={renderValue(statCount.totalClicks ,loading)} 
        icon="🖱️"
      />
      <StatCard
        label="Total Complited Videos Views"
        value={ renderValue(statCount.totalCompletedViews ,loading) }
        icon="🎬"
      />
      <StatCard
        label="Total Click Through Rate"
        value={getRate(loading, statCount.totalViews ?? 0, statCount.totalCompletedViews ?? 0) }
        icon="📈"
      />
    </div>
  );
};

export default StatsOverview;
