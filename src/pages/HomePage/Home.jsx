import BannerSection from "./BannerSection/BannerSection";
import ContactUsSection from "./ContactUsSection";
import FeaturesSection from "./FeaturesSection";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TouristStorySection from "./TouristStorySection";

const Home = () => {
  return (
    <>
      <BannerSection />
      <TourismAndTravelGuide />
      <TouristStorySection />
      <FeaturesSection />
      <ContactUsSection />
    </>
  );
};

export default Home;
