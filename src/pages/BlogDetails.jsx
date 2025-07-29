import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router";
import Loading from "../shared/loading";


const BlogDetails = () => {
  const { id } = useParams(); // Blog ID from route
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded my-10">
      {/* Blog Thumbnail */}
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-68 object-cover rounded mb-4"
      />

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {/* Blog Metadata */}
      <p className="text-sm text-gray-500 mb-4">
        Status:{" "}
        <span
          className={`font-semibold ${
            blog.status === "published" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {blog.status}
        </span>{" "}
        | {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Content */}
      <p className="text-gray-700 text-base leading-relaxed">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
