import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/loading";
import { FaUserFriends, FaHandHoldingUsd, FaTint } from "react-icons/fa";

const StatCard = ({ icon, title, count, bg }) => (
  <div
    className={`flex items-center gap-4 p-6 rounded-xl shadow text-white ${bg}`}
  >
    <div className="text-4xl">{icon}</div>
    <div>
      <h2 className="text-3xl font-bold">{count}</h2>
      <p className="text-sm uppercase">{title}</p>
    </div>
  </div>
);

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data; // { totalDonors, totalFunding, totalRequests }
    },
  });

  const { totalDonors = 0, totalFunding = 0, totalRequests = 0 } = data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="text-gray-600">
          Here is an overview of your platform statistics.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUserFriends />}
          title="Total Donors"
          count={totalDonors}
          bg="bg-blue-500"
        />
        <StatCard
          icon={<FaHandHoldingUsd />}
          title="Total Funding (৳)"
          count={totalFunding.toLocaleString()}
          bg="bg-green-500"
        />
        <StatCard
          icon={<FaTint />}
          title="Blood Requests"
          count={totalRequests}
          bg="bg-red-500"
        />
      </div>
    </div>
  );
};

export default VolunteerDashboard;
