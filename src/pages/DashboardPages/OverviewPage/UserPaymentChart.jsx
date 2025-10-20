import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const UserPaymentChart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPayments", user],
    queryFn: async() => {
        const res = await axiosSecure(`/payments/${user?.email}`)
    },
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Failed to load payments</div>;

  return (
    <div className="w-full h-80 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Payments by Package</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="packageTitle" />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [
              `$${value}`,
              name === "totalAmount" ? "Paid" : "Package Price",
            ]}
          />
          <Legend />
          <Bar dataKey="totalAmount" fill="#4ade80" name="Paid Amount" />
          <Bar dataKey="packagePrice" fill="#60a5fa" name="Package Price" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPaymentChart;
