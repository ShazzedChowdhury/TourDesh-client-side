import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/axiosPublic";
import Loading from "../../shared/loading";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const TouristStorySection = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("stories/random-tourist?limit=4");
      return data;
    },
  });

  if(isLoading) return <Loading />

  console.log(stories[0].images[0]);
  return (
    <section className="my-12 max-w-7xl mx-auto p-5 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Tourist Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            {/* Swiper for multiple images */}
            <div>
              <Swiper spaceBetween={10} slidesPerView={1}>
                {story.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-48 h-48 mx-auto">
                      <img
                        src={img}
                        alt={story.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{story.content}</p>

              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-primary btn-outline"
                >
                  login
                </button>
              ) : (
                <div className="flex items-center  mt-auto btn bg-blue-600 text-white">
                  {/* Facebook Share Button */}
                  <FacebookShareButton
                    url={window.location.href}
                    quote={story.title}
                    className="hover:opacity-80"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  Share On Facebook
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/all-stories")}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          All Stories
        </button>
      </div>
    </section>
  );
};

export default TouristStorySection;
