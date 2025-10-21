import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from "../../../shared/loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Section from "../../../components/Section";
import Title from "../../../components/Title";
import ReviewCard from "./ReviewCard";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteRight } from "react-icons/fa6";

const ReviewSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic("/reviews");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="bg-[#f2fbfa] py-10">
      <Section>
        <Title
          title="Traveler Reviews"
          subtitle="Discover how our tours and travel tips helped others make their journey unforgettable."
        />

        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide className="py-5" key={review?._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>
    </div>
  );
};

export default ReviewSection;
