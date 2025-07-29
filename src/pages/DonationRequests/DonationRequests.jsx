import { useEffect, useState } from "react";
import Loading from "../../shared/loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/pending-donation-requests").then((res) => {
      setRequests(res.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
 
  return (
    <div className="p-4 max-w-7xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">
        Pending Blood Donation Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id}>
                <td>{idx + 1}</td>
                <td>{req.recipientName}</td>
                <td>{req.hospitalName}</td>
                <td className="font-semibold">{req.bloodGroup}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      navigate(`/request-details/${req._id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No pending requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequests;
