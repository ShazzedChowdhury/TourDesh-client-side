import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/loading";

const PaymentChart = ({payments}) => {
 

  // 🧮 Calculate total payment
  const totalPayment = useMemo(
    () => payments.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    [payments]
  );

  // 🧾 Transform data for chart
  const chartData = payments.map((p) => ({
    name: p.paymentBy?.split("@")[0], // show username only
    amount: p.amount,
  }));

  // 🧠 Custom tooltip
  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { amount } = payload[0].payload;
      return (
        <div className="bg-white border shadow-md rounded-lg p-2 text-sm">
          <p className="font-semibold text-gray-800">Paid by: {label}</p>
          <p className="text-violet-600 font-medium">Amount: ${amount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Payment Overview</h2>
          <p className="text-gray-500 text-sm">
            Each user’s payment history from MongoDB
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">Total Payment</p>
          <h3 className="text-3xl font-bold text-violet-600">
            ${totalPayment.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={renderTooltip} />
            <Bar
              dataKey="amount"
              fill="url(#colorPayment)"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
            <defs>
              <linearGradient id="colorPayment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;
