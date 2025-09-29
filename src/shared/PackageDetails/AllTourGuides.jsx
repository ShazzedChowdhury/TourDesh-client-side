import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import useAxiosPublic from "../../hooks/axiosPublic";
import { Link } from "react-router";


const AllTourGuides = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch all users
  const { data: tourGuides = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`get-tour-guides`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

//   // Filter by role
//   const tourGuides = users.filter((user) => user.role === "tour guide");
//   console.log(tourGuides)
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Tour Guides</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tourGuides.map((guide) => (
          <Link
            to={`/tour-guide-profile/${guide._id}`}
            key={guide._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={guide.photoURL}
              alt={guide.userName}
              className="w-24 h-24 object-cover rounded-full mb-3"
            />
            <h3 className="font-semibold text-lg">{guide.userName}</h3>
            <p className="text-gray-500 text-sm">{guide.email}</p>
            <p className="mt-1 text-blue-600 font-medium">{guide.role}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllTourGuides;
