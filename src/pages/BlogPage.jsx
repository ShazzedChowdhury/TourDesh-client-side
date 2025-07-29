import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdPublish, MdUnpublished } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import sweetMessage from "../Utils/sweetMessage";
import { Link, useNavigate } from "react-router";

const BlogPage = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [refatch, setReFatch] = useState(false);
  const [filter, setFilter] = useState("all");
  const { role } = useRole(); 
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.get(`/published-blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, [refatch, filter]);


  return (
    <div className="p-6 min-h-[calc(100vh-89px-324px)] max-w-7xl mx-auto">
     
        <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
     
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, idx) => (
              <tr key={blog._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="font-semibold">{blog.title}</td>
                <td>
                  <span
                    className={`badge ${
                      blog.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="flex flex-wrap gap-2">
                  <Link
                    to= {`/blogs-details/${blog._id}`}
                    className="btn btn-primary"
                  >
                    view details
                  </Link>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPage;
