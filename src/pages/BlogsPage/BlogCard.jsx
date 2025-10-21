import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      {/* Image */}
      <div className="md:w-1/3 w-full h-48 md:h-auto flex-shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:w-2/3 w-full p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
            <span className="flex items-center gap-1">
              <FaUser /> {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {blog.date}
            </span>
            {blog.location && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {blog.location}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-[1rem] ">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
