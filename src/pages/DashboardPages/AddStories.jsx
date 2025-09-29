import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import sweetMessage from "../../Utils/sweetMessage";
import useRole from "../../hooks/useRole";
import Loading from "../../shared/loading";
import useAuth from "../../hooks/useAuth";

const imageHostingKey = import.meta.env.VITE_imageBB_api_key; // store key in .env
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddStories = () => {
  const { register, handleSubmit, reset } = useForm();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {role, loading} = useRole();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload multiple images to imgbb
      const imageFiles = data.photos;
      const imageUrls = [];
        console.log(imageFiles)
      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("image", imageFiles[i]);

        const res = await fetch(imageHostingApi, {
          method: "POST",
          body: formData,
        });

        const imgData = await res.json();
        if (imgData.success) {
          imageUrls.push(imgData.data.display_url);
        }
      }

      // Prepare story payload
      const storyData = {
        title: data.title,
        content: data.content,
        images: imageUrls,
        addedBy: user?.email,
        role, 
        createdAt: new Date().toISOString(),
      };

      // Send to backend
     const res = await axiosSecure.post("/stories", storyData);

     if (res.data.insertedId) {
         sweetMessage("Story added successfully!")
         reset();
         navigate("/dashboard/manage-stories");
     } 
    
    } catch (error) {
      console.error("Error adding story:", error);
    } finally {
      setUploading(false);
    }
  };

  if(loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Story Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter story title"
          />
        </div>

        {/* Story Content */}
        <div>
          <label className="block font-semibold mb-1">Story Content</label>
          <textarea
            {...register("content", { required: true })}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Write your story here..."
          ></textarea>
        </div>

        {/* Upload Multiple Images */}
        <div>
          <label className="block font-semibold mb-1">Upload Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("photos", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Story"}
        </button>
      </form>
    </div>
  );
};

export default AddStories;
