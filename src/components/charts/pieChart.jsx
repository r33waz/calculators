import formatNumberInNepali from "@/utils/formattedNumber";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Pie_Chart({ data, COLORS, cx, cy, height }) {
  return (
    <ResponsiveContainer width="100%" height={height ? height : 500}>
      {" "}
      {/* Set height as needed */}
      <PieChart>
        <Pie
          data={data}
          cx={cx ? cx : "50%"} // Center horizontally
          cy={cy ? cy : "50%"} // Center vertically
          innerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload[0] && payload[0].value) {
              return (
                <div
                  className="bg-white text-black p-2 flex gap-1"
                  style={{
                    borderRadius: "5px",
                    border: "1px solid black",
                  }}
                >
                  <p className="font-semibold">{`${payload[0].name}`}: </p>
                  <p>{`Rs${formatNumberInNepali(payload[0]?.value)}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Pie_Chart;
