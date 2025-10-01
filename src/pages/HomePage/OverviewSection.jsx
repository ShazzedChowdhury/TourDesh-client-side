import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OverviewSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/overview");
      return data;
    },
  });


  if (isLoading) return <p>Loading overview...</p>;


  const stats = [
    { label: "Packages", value: overview.totalPackages },
    { label: "Tour Guides", value: overview.totalGuides },
    { label: "Stories", value: overview.totalStories },
    { label: "Tourists", value: overview.totalClients },
  ];

  return (
    <section className=" text-center max-w-7xl mx-auto px-5 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6"
          >
            <h3 className="text-3xl font-bold text-primary mb-2">
              <CountUp end={stat.value} duration={2} separator="," />
            </h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
