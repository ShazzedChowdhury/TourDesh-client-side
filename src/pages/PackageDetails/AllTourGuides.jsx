import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {motion} from "framer-motion"
import Title from "../../components/Title";


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
      <Title
        title="Meet Our Expert Tour Guides"
        subtitle="Discover the experienced guides who make every journey insightful, safe, and memorable."
      />
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {tourGuides.map((guide) => (
          <div
            key={guide._id}
            className="bg-base-100 rounded-lg shadow hover:shadow-lg p-4 text-center"
          >
            <img
              src={guide.photoURL}
              alt={guide.userName}
              className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
            />
            <h3 className="text-sm sm:text-lg font-bold">{guide.userName}</h3>
            <p className="text-[0.7rem] sm:text-sm text-gray-500">
              {guide.email}
            </p>
            <p className="badge block mx-auto badge-success mt-1">
              {guide.role}
            </p>
            <button
              onClick={() => navigate(`/tour-guide-profile/${guide._id}`)}
              className="btn btn-outline btn-sm mt-3"
            >
              View Details
            </button>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default AllTourGuides;
