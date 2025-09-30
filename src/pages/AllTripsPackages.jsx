import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import useAxiosPublic from "../hooks/axiosPublic";
import Loading from "../shared/loading";
import { Link } from "react-router";


const AllTrips = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch packages from backend
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Trips</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="card bg-base-100 shadow-xl rounded-lg overflow-hidden"
          >
            {/* Image Slider */}
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="w-full h-56"
            >
              {pkg.images?.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`Package ${i}`}
                    className="w-full h-56 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Card Body */}
            <div className="card-body">
              <h3 className="card-title">{pkg.title}</h3>
              <p className="text-gray-600 text-sm">{pkg.description}</p>
              <p className="font-semibold">📍 {pkg.location}</p>
              <p className="font-bold text-primary">💰 ${pkg.price}</p>

              <div className="card-actions mt-4">
                <Link to={`/package-details/${pkg._id}`}>
                  <button className="btn btn-primary w-full">
                    Package Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
