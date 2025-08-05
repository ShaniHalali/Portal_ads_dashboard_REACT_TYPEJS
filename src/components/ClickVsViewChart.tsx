import "./ClickVsViewChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

type Ad = {
  ad_name: string;
  ad_id: string;
  clicks_count: number;
  views_count: number;
};

const ClickVsViewChart = () => {
  const [ads, setAds] = useState<Ad[] | null>(null);

  useEffect(() => {
    axios
      .get("https://ad-sdk-flask-api.vercel.app/ad_sdk/AdClickStats/all")
      .then((res) => {
        console.log("Fetched ads:", res.data);

        //  GROUP BY - ad_id
        const grouped: Record<string, Ad> = {};

        res.data.forEach((ad: any) => {
          const adId = ad.ad_id;
          const adName = ad.ad_name || "Unknown Ad";

          if (!grouped[adId]) {
            grouped[adId] = {
              ad_id: adId,
              ad_name: adName,
              clicks_count: Number(ad.clicks_count ?? 0),
              views_count: Number(ad.views_count ?? 0),
            };
          } else {
            grouped[adId].clicks_count += Number(ad.clicks_count ?? 0);
            grouped[adId].views_count += Number(ad.views_count ?? 0);
          }
        });

        const transformed = Object.values(grouped);
        console.log("Transformed ads (grouped):", transformed);
        setAds(transformed);
      })
      .catch((err) => {
        console.error("Failed to fetch ads", err);
      });
  }, []);

  let chart_content;
  if (ads == null) {
    chart_content = <p>Loading...</p>;
  } else if (ads.length === 0) {
    chart_content = <p>No ads available</p>;
  } else {
    chart_content = (
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={ads}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="ad_name"
            angle={-10} 
            textAnchor="end" 
            interval={0} 
            height={80} 
            fontSize={12}
          />

          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views_count" fill="#8884d8" />
          <Bar dataKey="clicks_count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="chart-fragment-div">
      <div className="chart-container">
        <h3 className="chart-title">Clicks vs Views – For all active ads</h3>
        {chart_content}
      </div>
    </div>
  );
};

export default ClickVsViewChart;
