import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/loading";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import sweetMessage from "../../../Utils/sweetMessage";

const DonorDashboard = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    isPending,
    isError,
    refetch,
    data: donationRequests=[],
    error,
  } = useQuery({
    queryKey: ["myRequests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-donation-requests");
      return res.data;
    },
  });

 if(isPending) {
   return <Loading />
 }

  const handleDelete = async (id) => {
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount){
           Swal.fire({
             title: "Deleted!",
             text: "Your file has been deleted.",
             icon: "success",
           });
           refetch()
        }

       
       } catch (err) {
         console.error("Failed to delete", err);
       }

       
     }
   }); 
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(id, newStatus);
    try {
      const res = await axiosSecure.patch(`/update-request-status/${id}`, { status: newStatus });

      if(res.data.modifiedCount){
        sweetMessage("Status update successfully.")
        refetch()
      }
      
      
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };
  console.log(donationRequests)
  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold">Welcome, {user.displayName} 🏠</h1>

      {donationRequests.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
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
              {donationRequests.map((req) => (
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
                      to={`/request-details/${req._id}`}
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
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/dashboard/my-donation-requests")}
          className="btn btn-primary mx-auto"
        >
          View my all requests
        </button>
      </div>
    </div>
  );
};

export default DonorDashboard;
