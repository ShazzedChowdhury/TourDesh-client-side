import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/loading";
import { Link, useNavigate } from "react-router";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [myRequests, setMyRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const {
    //   isPending,
    //   isError,
    //   data: myRequests = [],
    //   error,
    // } = useQuery({
    //   queryKey: ["myRequests", user.email],
    //   queryFn: async () => {
    //     const res = await axiosSecure.get("/my-donation-requests");
    //     return res.data;
    //   },
    // });


    useEffect(() => {
      axiosSecure
        .get(`/my-donation-requests?page=${page}&filter=${filter}`)
        .then((res) => {
          setMyRequests(res.data.requests);
          setTotalPages(Math.ceil(res.data.totalCount / 5));
        });
    }, [user, page, filter]);


  

    const handleDelete = async (id) => {
      // const confirm = window.confirm("Are you sure you want to delete?");
      // if (!confirm) return;
      // try {
      //   await axios.delete(`/api/donations/${id}`);
      //   setmyRequests((prev) => prev.filter((d) => d._id !== id));
      // } catch (err) {
      //   console.error("Failed to delete", err);
      // }
    };

    const handleStatusChange = async (id, newStatus) => {
      // try {
      //   await axios.patch(`/api/donations/${id}`, { donation_status: newStatus });
      //   setmyRequests((prev) =>
      //     prev.map((d) =>
      //       d._id === id ? { ...d, donation_status: newStatus } : d
      //     )
      //   );
      // } catch (err) {
      //   console.error("Failed to update status", err);
      // }
    };
    console.log(filter);
    //   if (isPending) {
    //     return <Loading />;
    //   }
    return (
      <div className="space-y-6 ">
        <div className="overflow-x-auto bg-white shadow-md rounded-xl p-5">
          <div className="flex justify-around items-center">
            <h1 className="text-2xl font-bold py-10 text-primary w-full">
              My Donation Requests
            </h1>
            <select
              className="h-fit p-3 border border-gray-200 rounded-sm"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="inprogress">Inprogress</option>
              <option value="done">Done</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Name</th>
                <th>Donor Email</th>
                <th>Actions</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipient_upazila}
                  </td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td className="capitalize">{req.donationStatus}</td>
                  <td>
                    {req.donationStatus === "inprogress" ? (
                      <>{req.requesterName}</>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {req.donationStatus === "inprogress" ? (
                      <>{req.requesterEmail}</>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="flex flex-col gap-2">
                    <Link
                      to={`/dashboard/donation/${req._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/dashboard/update-donation-request/${req._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>

                  <td>
                    <div className="flex flex-col gap-2">
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="btn btn-sm btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {myRequests.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center p-5 text-gray-500">
                    No donation request added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {myRequests.length > 0 && (
            <div className="m-4 flex justify-center items-center gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-1 rounded border ${
                    page === idx + 1 ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
};

export default MyDonationRequests;