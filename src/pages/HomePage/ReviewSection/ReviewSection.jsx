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
import {motion} from "framer-motion"

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
    // <div className="bg-[#f2fbfa] py-10">
    //   <Section>
    //     <Title
    //       title="Traveler Reviews"
    //       subtitle="Discover how our tours and travel tips helped others make their journey unforgettable."
    //     />

    //     <Swiper
    //       spaceBetween={20}
    //       slidesPerView={3}
    //       loop={true}
    //       autoplay={{ delay: 4000 }}
    //       breakpoints={{
    //         0: { slidesPerView: 1 },
    //         768: { slidesPerView: 2 },
    //         1024: { slidesPerView: 3 },
    //       }}
    //     >
    //       {reviews.map((review) => (
    //         <SwiperSlide className="py-5" key={review?._id}>
    //           <ReviewCard review={review} />
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </Section>
    // </div>
    <motion.div
      className="bg-[#f2fbfa] py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <Section>
        <Title
          title="Traveler Reviews"
          subtitle="Discover how our tours and travel tips helped others make their journey unforgettable."
        />

        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={true}
          loopedSlides={reviews.length}
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
    </motion.div>
  );
};

export default ReviewSection;
