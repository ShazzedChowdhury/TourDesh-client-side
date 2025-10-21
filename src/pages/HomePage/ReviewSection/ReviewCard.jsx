import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion"
import { useSwiperSlide } from "swiper/react";
const ReviewCard = ({ review }) => {
    const swiperSlide = useSwiperSlide();
    console.log(swiperSlide)
  return (
    // <div className="bg-base-100 shadow-lg rounded-xl p-5 text-center space-y-3">
    //   <div className="flex justify-center">
    //     <img
    //       src={review.image}
    //       alt={review.name}
    //       className="w-16 h-16 rounded-full object-cover"
    //     />
    //   </div>
    //   <h3 className="font-semibold text-lg">{review.name}</h3>
    //   <p className="text-sm text-gray-500">{review.location}</p>
    //   <div className="flex justify-center text-yellow-500">
    //     {[...Array(review.rating)].map((_, i) => (
    //       <FaStar key={i} />
    //     ))}
    //   </div>
    //   <p className="text-gray-600 text-sm italic">"{review.review}"</p>
    // </div>
    <motion.div
      className="bg-base-100 shadow-lg rounded-xl p-5 text-center space-y-3"
      animate={{ scale: swiperSlide.isActive ? 1 : 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center">
        <img
          src={review.image}
          alt={review.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg">{review.name}</h3>
      <p className="text-sm text-gray-500">{review.location}</p>
      <div className="flex justify-center text-yellow-500">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-600 text-sm italic">"{review.review}"</p>
    </motion.div>
  );
};

export default ReviewCard;
