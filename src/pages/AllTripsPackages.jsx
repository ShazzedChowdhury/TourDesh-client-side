import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/loading";
import { Link } from "react-router";
import { useState } from "react";

const AllTrips = () => {
  const axiosPublic = useAxiosPublic();
  const [sort, setSort] = useState("");

  // Fetch packages from backend
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages", sort],
    queryFn: async () => {
      const res = await axiosPublic.get(`/packages?sort=${sort}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <div className="w-full flex justify-end py-5">
        <select onChange={(e) => handleSort(e)} className="select select-md">
          <option selected disabled={true}>Sort by price</option>
          <option value="">Default</option>
          <option value="1">Low Price</option>
          <option value="-1">High Price</option>
        </select>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {packages?.map((pkg) => (
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
              <p className="font-semibold">📍 {pkg.location}</p>
              <p className="font-bold text-primary">💰 ${pkg.price}</p>

              <div className="card-actions">
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
