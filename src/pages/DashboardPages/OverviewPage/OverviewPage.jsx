import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../shared/loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaDollarSign,
  FaUsers,
  FaSuitcase,
  FaUserTie,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import PaymentChart from "./PaymentChart";
import PaymentTable from "./paymentTable";
import { FaClock } from "react-icons/fa6";
import UserPaymentChart from "./UserPaymentChart";
import useAuth from "../../../hooks/useAuth";

const OverviewPage = () => {
  const { role, loading } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats", role],
    queryFn: async () => {
      const res = await axiosSecure.get(`${role === "admin" ? "admin-stats" : "user-stats"}`);
      return res.data;
    },
  });

   // Fetch payment data
   const { data: payments = [] } = useQuery({
     queryKey: ["payments", role],
     queryFn: async () => {
       const res = await axiosSecure.get(`/payments`);
       return res.data;
     },
   });

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {role === "admin" && (
        <>
          <section className="w-full max-w-7xl mt-6 grid grid-cols-2  md:grid-cols-3 xl:grid-cols-5 gap-5">
            {/* Total Payment */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-emerald-400 to-green-600 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Payment</h3>
                <p className="text-2xl font-bold">${stats.totalPayment || 0}</p>
              </div>
              <FaDollarSign className="text-4xl opacity-90" />
            </div>

            {/* Total Tour Guides */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Tour Guides</h3>
                <p className="text-2xl font-bold">{stats.totalGuides || 0}</p>
              </div>
              <FaUserTie className="text-4xl opacity-90" />
            </div>

            {/* Total Packages */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Packages</h3>
                <p className="text-2xl font-bold">{stats.totalPackages || 0}</p>
              </div>
              <FaSuitcase className="text-4xl opacity-90" />
            </div>

            {/* Total Clients */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-pink-400 to-rose-600 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Clients</h3>
                <p className="text-2xl font-bold">{stats.totalClients || 0}</p>
              </div>
              <FaUsers className="text-4xl opacity-90" />
            </div>

            {/* Total Stories */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-purple-500 to-violet-700 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Stories</h3>
                <p className="text-2xl font-bold">{stats.totalStories || 0}</p>
              </div>
              <FaBookOpen className="text-4xl opacity-90" />
            </div>
          </section>
          <section className="mt-5 max-w-7xl">
            <PaymentChart payments={payments} />
            <PaymentTable payments={payments} />
          </section>
        </>
      )}
      {role === "tourist" && (
        <>
          <section className="w-full max-w-7xl mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {/* Total Payment */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-emerald-400 to-green-600 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Payment</h3>
                <p className="text-2xl font-bold">${stats.totalPayment || 0}</p>
              </div>
              <FaDollarSign className="text-4xl opacity-90" />
            </div>

            {/* Total Pending */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Pending</h3>
                <p className="text-2xl font-bold">{stats.totalPending || 0}</p>
              </div>
              <FaClock className="text-4xl opacity-90" />
            </div>

            {/* Total Accepted */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Accepted</h3>
                <p className="text-2xl font-bold">{stats.totalAccepted || 0}</p>
              </div>
              <FaCheckCircle className="text-4xl opacity-90" />
            </div>

            {/* Total Stories */}
            <div className="p-5 rounded-2xl text-white shadow-lg bg-gradient-to-r from-purple-500 to-violet-700 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div>
                <h3 className="font-semibold text-lg">Total Stories</h3>
                <p className="text-2xl font-bold">{stats.totalStories || 0}</p>
              </div>
              <FaBookOpen className="text-4xl opacity-90" />
            </div>
          </section>

          {/* <section className="mt-5 max-w-7xl">
            <UserPaymentChart  />
            <PaymentTable payments={payments} />
          </section> */}
        </>
      )}
    </div>
  );
};

export default OverviewPage;
