import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { TfiPackage } from "react-icons/tfi";
import { SlPeople } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineWebStories } from "react-icons/md";
import { motion } from "framer-motion"

const OverviewSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/overview");
      return data;
    },
  });

    const stats = [
      {
        icon: MdOutlineWebStories,
        label: "Stories",
        value: overview.totalStories,
        desc: "Inspiring travel stories from real explorers.",
      },
      {
        icon: SlPeople,
        label: "Tour Guides",
        value: overview.totalGuides,
        desc: "Expert guides helping you discover every hidden gem.",
      },
      {
        icon: FaRegUser,
        label: "Tourists",
        value: overview.totalClients,
        desc: "Happy travelers who explored with us.",
      },
      {
        icon: TfiPackage,
        label: "Packages",
        value: overview.totalPackages,
        desc: "Curated travel experiences for every destination.",
      },
    ];

  return (
    <section className="text-center max-w-7xl px-5 mx-auto md:px-10 relative -top-15">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon; // ✅ turn icon into a React component
          return (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx}}
              viewport={{ once: true }}
              key={idx}
              className="p-6 flex flex-col items-center justify-center space-y-2 bg-white shadow-lg rounded-lg z-10 hover:shadow-xl transition-shadow duration-100"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full bg-primary/10`}
              >
                <Icon className="text-3xl text-primary" />
              </div>
              {/* ✅ show icon */}
              <h3 className="text-3xl font-bold text-primary">
                <CountUp end={stat.value || 0} duration={2} separator="," />
              </h3>
              <p className="text-gray-700 font-bold">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OverviewSection;
