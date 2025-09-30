import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../shared/loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyAssignedTours = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all bookings assigned to this guide
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["myAssignedTours", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `bookings?guideEmail=${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating booking status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(
        `bookings/${id}`,
        { status }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myAssignedTours", user?.email]);
    },
  });

  if (isLoading) return <Loading />;

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status: "rejected" });
        Swal.fire("Rejected!", "Booking has been rejected.", "success");
      }
    });
  };

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, status: "accepted" });
    Swal.fire("Accepted!", "Booking has been accepted.", "success");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Tourist Name</th>
              <th>Tour Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.packageName}</td>
                <td>{booking.touristName}</td>
                <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                <td>${booking.price}</td>
                <td className="capitalize">{booking.status}</td>
                <td className="flex gap-2">
                  {/* Accept button - enabled only if status = in review */}
                  <button
                    className="btn btn-success btn-sm"
                    disabled={booking.status !== "in review"}
                    onClick={() => handleAccept(booking._id)}
                  >
                    Accept
                  </button>

                  {/* Reject button - only available if status = pending */}
                  {booking.status === "pending" && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleReject(booking._id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedTours;