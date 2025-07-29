import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import sweetMessage from "../../Utils/sweetMessage";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
    const axiosSecure = useAxiosSecure()
  

  const onSubmit = async (data) => {
     const formData = new FormData();
  formData.append("image", data.thumbnail[0]);

 
    try {
      // Upload thumbnail to imgbb
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imageBB_api_key
        }`,
        formData // send FormData object here
      );

      const thumbnailURL = res.data.data.display_url;

      // Prepare blog payload
      const blogData = {
        title: data.title,
        thumbnail: thumbnailURL,
        content: content,
        status: "draft",
        createdAt: new Date().toISOString(),
      };
      console.log(thumbnailURL, blogData);
      // Send blog to server
     const blogRes = await axiosSecure.post("/blogs", blogData);
      if(blogRes.data.insertedId){
        sweetMessage("Blog created successfully!");
          reset();
          setContent("");
      }
          
    } catch (error) {
      console.error("Blog creation failed:", error);
      sweetMessage("Failed to create blog.", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter blog title"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block font-medium mb-1">Blog Content</label>
          <textarea
            className="textarea textarea-bordered w-full h-40"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
