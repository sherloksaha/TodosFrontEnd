import React, { useEffect, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { apiClient } from "../config/apiConfig";
const RADIAN = Math.PI / 180;
export const Chart = () => {
  const [inActive, setInActive] = useState({
    activeU: 0,
    pendingWork: 0,
    completedWork: 0,
    inactiveU: 0,
  });
  const PieChartData = async () => {
    try {
      const res = await apiClient.get("/pie-chart-data");
      setInActive({
        activeU: Number(res?.data?.totUser) - Number(res?.data?.inActiveUser),
        pendingWork: Number(res?.data?.pendingWork),
        completedWork:
          Number(res?.data?.totWork) - Number(res?.data?.pendingWork),
        inactiveU: Number(res?.data?.inActiveUser),
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    PieChartData();
  }, []);
  const data = [
    { name: "Total Active Users", value: inActive?.activeU },
    { name: "Total In-active Users", value: inActive?.inactiveU },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data01 = [
    { name: "Total Pending Task", value: inActive?.pendingWork },
    { name: "Total Completed Task", value: inActive?.completedWork },
  ];

  
  return (
    <>
      <h3>Pie Charts Data</h3>
      <div className="charts">
        <PieChart width={1000} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <p>ffff</p>
          <Pie
            dataKey="value"
            data={data01}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          />

          <Tooltip />
        </PieChart>

        {/* <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart> */}
      </div>
    </>
  );
};
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
