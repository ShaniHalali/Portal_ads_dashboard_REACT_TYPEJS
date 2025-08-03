import "./AdStatsPie.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

type AdClickStat = {
  category: string;
  views_count: number;
};

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const AdStatsPie = () => {
  const [adStats, setAdStats] = useState<AdClickStat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageName = "AdClickStats";
        const response = await axios.get(
          `https://ad-sdk-flask-api.vercel.app/ad_sdk/${packageName}/all`
        );
        console.log("API response:", response.data);

        setAdStats(response.data);
      } catch (error) {
        console.error("Failed to fetch ad stats:", error);
      }
    };

    fetchData();
  }, []);

  const calculateCategoryPercentages = () => {
    if (!Array.isArray(adStats)) return [];

    const categoryMap: { [category: string]: number } = {};

    adStats.forEach((stat) => {
      if (!stat.category) return;
      if (!categoryMap[stat.category]) {
        categoryMap[stat.category] = 0;
      }
      categoryMap[stat.category] += stat.views_count;
    });

    const totalViews = Object.values(categoryMap).reduce(
      (sum, count) => sum + count,
      0
    );

    return Object.entries(categoryMap).map(([category, count]) => ({
      name: category,
      value: parseFloat(((count / totalViews) * 100).toFixed(1)),
      rawCount: count,
    }));
  };

  // CustomTooltip - with mouse object
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="info-window-div"
          style={{
            background: "white",
            border: "1px solid #ccc",
            padding: "8px",
          }}
        >
          <p>
            <strong>{data.name}</strong>
          </p>
          <p>Views: {data.rawCount}</p>
          <p>Percentage: {data.value}%</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <h3 style={{ marginBottom: "16px" }}>Ads by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={calculateCategoryPercentages()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name} - ${value}%`}
          >
            {calculateCategoryPercentages().map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdStatsPie;
