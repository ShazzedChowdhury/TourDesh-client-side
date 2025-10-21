import React from "react";
import Section from "../../components/Section";
import Title from "../../components/Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/loading";
import { Link } from "react-router";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const BlogSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic("/blogs?limit=3");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <Section>
      <Title
        title="Travel Tips & Advice"
        subtitle="Smart insights, helpful hacks, and expert advice to make every journey smoother and more memorable."
      />

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog?._id}
            className="bg-base-100 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Blog Image */}
            <figure className="relative h-52 w-full">
              <img
                src={blog?.image}
                alt={blog?.title}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Blog Content */}
            <div className="p-5 space-y-3">
              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <span className="flex items-center gap-1">
                  <FaUser className="text-[13px]" />{" "}
                  {blog?.author?.toLowerCase()}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-[13px]" />{" "}
                  {new Date(blog?.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 ">
                {blog?.title}
              </h2>

              {/* Short Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {blog?.content?.length > 100
                  ? blog?.content.slice(0, 100) + "..."
                  : blog?.content}
              </p>

              {/* Read More Link */}
              <Link
                to={`/blogs`}
                className="text-primary  font-medium inline-flex items-center gap-1 text-lg mt-2 hover:gap-2 transition-all"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BlogSection;
