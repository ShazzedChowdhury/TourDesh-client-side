import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import sweetMessage from "../../../Utils/sweetMessage";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch bookings for logged-in user
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id) => {
    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount) {
        sweetMessage("Bookings deleted successfully.")
        refetch();
      }
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  if (isLoading) return <p className="text-center">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Tour Guide</th>
              <th>Tour Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b._id}>
                <td>{idx + 1}</td>
                <td>{b.packageName}</td>
                <td>{b.guideEmail || "Not Assigned"}</td>
                <td>{format(new Date(b.tourDate), "PPP")}</td>
                <td>${b.price}</td>
                <td
                  className={`capitalize ${
                    b.status === "pending"
                      ? "text-warning"
                      : b.status === "accepted"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {b.status}
                </td>
                <td className="flex gap-2">
                  {b.status === "pending" && (
                    <>
                      <button className="btn btn-sm btn-success">Pay</button>
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {b.status !== "pending" && <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
