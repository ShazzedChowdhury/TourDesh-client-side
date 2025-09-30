import BannerSection from "./BannerSection/BannerSection";
import ContactUsSection from "./ContactUsSection";
import FeaturesSection from "./FeaturesSection";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";

const Home = () => {
  return (
    <>
      <BannerSection />
      <TourismAndTravelGuide />
      <FeaturesSection />
      <ContactUsSection />
    </>
  );
};

export default Home;
