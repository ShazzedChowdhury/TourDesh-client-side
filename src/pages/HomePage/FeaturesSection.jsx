import React, { use, useEffect, useState } from "react";
import Loading from "../../shared/loading";


const FeaturesSection = () => {
  const [featuresData, setFeaturesData] = useState(null);

  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => setFeaturesData(data.section));
  }, []);

  if (!featuresData) return <Loading />;

  return (
    <section
      className="bg-base-100 dark:bg-[#000000] py-20 px-5 md:px-10 max-w-7xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center pb-5">
        {featuresData.title}
      </h1>
      <p className="text-lg font-semibold text-center pb-10">
        {featuresData.subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featuresData?.features.map((feature, index) => {
          return (
            <div
              key={index}
              className="text-center bg-base-100 transition duration-300 hover:shadow-lg transform hover:-translate-y-2 rounded-sm p-5 py-10 border-2 border-primary"
            >
              <h3 className="text-lg font-bold mb-5">{feature.title}</h3>
              <p className="text-sm font-semibold">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
