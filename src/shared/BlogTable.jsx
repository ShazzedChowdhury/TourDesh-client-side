import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdPublish, MdUnpublished } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import sweetMessage from "../Utils/sweetMessage";

const BlogTable = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [refatch, setReFatch] = useState(false);
  const [filter, setFilter] = useState("all");
  const { role } = useRole(); // Replace with actual admin logic (e.g., from user context)

  useEffect(() => {
    axiosSecure.get(`/blogs?filter=${filter}`).then((res) => {
      setBlogs(res.data);
    });
  }, [refatch, filter]);

  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "draft" ? "published" : "draft";
    try {
     const res = await axiosSecure.patch(`/update-blogs-status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount) {
        sweetMessage("Status updated successfully.");
        setReFatch((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to update blog status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      if (res.data.deletedCount) {
        sweetMessage("Status deleted successfully.");
        setReFatch((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center py-5">
        <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
        <select
          className="h-fit p-3 border border-gray-200 rounded-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
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
                  {/* Publish/Unpublish */}
                  {role === "admin" && (
                    <button
                      onClick={() => handlePublishToggle(blog._id, blog.status)}
                      className={`btn btn-sm ${
                        blog.status === "draft" ? "btn-success" : "btn-warning"
                      }`}
                    >
                      {blog.status === "draft" ? (
                        <>
                          <MdPublish className="mr-1" /> Publish
                        </>
                      ) : (
                        <>
                          <MdUnpublished className="mr-1" /> Unpublish
                        </>
                      )}
                    </button>
                  )}

                  {/* Delete */}
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  )}
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

export default BlogTable;
