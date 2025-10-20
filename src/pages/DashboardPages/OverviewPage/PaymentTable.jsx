import React from "react";
import {
  FaUser,
  FaMoneyBillWave,
  FaReceipt,
  FaCalendarAlt,
} from "react-icons/fa";

const PaymentTable = ({ payments = [] }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 mt-5">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Payment Records</h2>
        <p className="text-sm text-gray-500">
          Total Payments: <span className="font-medium">{payments.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="">
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" /> Payer
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-gray-500" /> Amount
                </div>
              </th>
              <th className="px-4 py-3 font-semibold ">
                <div className="flex items-center gap-2">
                  <FaReceipt className="text-gray-500" /> Transaction ID
                </div>
              </th>
              <th className="px-4 py-3 font-semibold ">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" /> Date
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {payments.length > 0 ? (
              payments.map((p, index) => (
                <tr
                  key={p._id || index}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-800">{p.paymentBy}</td>
                  <td className="px-4 py-3 font-medium text-violet-600">
                    ${p.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{p.transactionId}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500 italic bg-gray-50"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
