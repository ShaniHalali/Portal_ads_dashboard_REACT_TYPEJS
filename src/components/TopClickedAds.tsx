import { useEffect, useState } from 'react';
import axios from 'axios';

type AdClickStat = {
  ad_name: string;
  clicks_count: number;
};

const COLORS = ["#f06292", "#64b5f6", "#fbc02d"];

const TopClickedAds = () => {
  const [topAds, setTopAds] = useState<AdClickStat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageName = "AdClickStats";
        const response = await axios.get(`https://ad-sdk-flask-api.vercel.app/ad_sdk/${packageName}/all`);
        const allAds: AdClickStat[] = response.data;

        const sorted = [...allAds]
          .filter(ad => ad.clicks_count > 0)
          .sort((a, b) => b.clicks_count - a.clicks_count)
          .slice(0, 3);

        setTopAds(sorted);
      } catch (error) {
        console.error("Failed to fetch top clicked ads:", error);
      }
    };

    fetchData();
  }, []);

  const maxClicks = Math.max(...topAds.map(ad => ad.clicks_count), 1); // כדי למנוע חלוקה ב־0

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h3 style={{ marginBottom: "20px" }}>Top Clicked Ads</h3>
      {topAds.map((ad, index) => {
        const percentage = (ad.clicks_count / maxClicks) * 100;

        return (
          <div key={index} style={{ marginBottom: "12px" }}>
            <div
              style={{
                height: "40px",
                width: `${percentage}%`,
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 15px",
                color: "white",
                fontWeight: "bold",
                transition: "width 0.5s ease",
              }}
            >
              <span>{ad.ad_name}</span>
              <span>{ad.clicks_count.toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopClickedAds;
