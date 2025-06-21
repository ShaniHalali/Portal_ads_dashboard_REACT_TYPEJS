import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard"; 


const StatsOverview = () => {
  const [totalClicks, setTotalClicks] = useState<number | null>(null);
  const [totalCompletedViews, setTotalCompletedViews] = useState<number | null>(null);
  const [totalViews, setTotalViews] = useState<number | null>(null);
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ad-sdk-flask-api.vercel.app/ad_sdk/AdClickStats/summary")
      .then((res) => {
        setTotalClicks(res.data.total_clicks);
        setTotalCompletedViews(res.data.total_completed_views);
        setTotalViews(res.data.total_views);
        
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
        value={loading ? "Loading..." : (totalViews ?? 0).toString()}
        icon="👁️"
      />
      <StatCard
        label="Total Clicks"
        value={loading ? "Loading..." : (totalClicks ?? 0).toString()}
        icon="🖱️"
      />
       <StatCard
        label="Total Complited Videos Views"
        value={loading ? "Loading..." : (totalCompletedViews ?? 0).toString()}
        icon="🎬"
      />
         <StatCard
        label="Total Click Through Rate"
        value={loading? "Loading...": totalViews && totalViews > 0? ((totalCompletedViews ?? 0) / totalViews * 100).toFixed(1) + "%": "0%"}
        icon="📈"
      />
    </div>
  );
};

export default StatsOverview;
