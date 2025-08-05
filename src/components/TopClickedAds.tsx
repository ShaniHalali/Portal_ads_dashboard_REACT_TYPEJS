import "./TopClickedAds.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
        const response = await axios.get(
          `https://ad-sdk-flask-api.vercel.app/ad_sdk/${packageName}/all`
        );
        const allAds: AdClickStat[] = response.data;

        const topThreeAds = [...allAds]
          .filter((ad) => ad.clicks_count > 0)
          .sort((a, b) => b.clicks_count - a.clicks_count)
          .slice(0, 3);

        setTopAds(topThreeAds);
      } catch (error) {
        console.error("Failed to fetch top clicked ads:", error);
      }
    };

    fetchData();
  }, []);

  const maxClicks = Math.max(...topAds.map((ad) => ad.clicks_count), 1);

  return (
    <div className="frame-div">
      <h3 className="top-click-title">Top Clicked Ads</h3>
      {topAds.map((ad, index) => {
        const percentage = (ad.clicks_count / maxClicks) * 100;

        return (
          <div className="space-object-div" key={index}>
            <div
              className="ad-div"
              style={{
                width: `${percentage - 10}%`,
                backgroundColor: COLORS[index % COLORS.length],
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
