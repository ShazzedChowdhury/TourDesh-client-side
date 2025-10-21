import BannerSection from "./BannerSection/BannerSection";
import BlogSection from "./BlogSection";
import ContactUsSection from "./ContactUsSection";
import FeaturesSection from "./FeaturesSection";
import OverviewSection from "./OverviewSection";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TouristStorySection from "./TouristStorySection";

const Home = () => {
  return (
    <>
      <BannerSection />
      <OverviewSection />
      <TourismAndTravelGuide />
      <TouristStorySection />
      <BlogSection />
      <FeaturesSection />
      <ContactUsSection />
    </>
  );
};

export default Home;
