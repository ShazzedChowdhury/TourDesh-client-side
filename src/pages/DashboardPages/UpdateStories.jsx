import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../shared/loading';
import { useForm } from 'react-hook-form';
import sweetMessage from '../../Utils/sweetMessage';


const imageHostingKey = import.meta.env.VITE_imageBB_api_key; // store key in .env
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateStories = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
 const queryClient = useQueryClient();
 const { register, handleSubmit, reset } = useForm();
 const [loading, setLoading] = useState(false);

  const { data: story = [], isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`stories/${id}`);
      return res.data;
    },
  });

  // Handle removing image ($pull)
  const handleRemoveImage = async (imgUrl) => {
    try {
      await axiosSecure.patch(`update-stories-img/${id}`, { imgUrl });
      queryClient.invalidateQueries(["story", id]);
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  // Handle adding new image ($push)
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(imageHostingApi, {
        method: "POST",
        body: formData,
      });
      const imgData = await res.json();

      if (imgData.success) {
        await axiosSecure.patch(`update-stories-img/${id}`, {
          imgUrl: imgData.data.display_url,
        });
        queryClient.invalidateQueries(["story", id]);
      }
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  };

  // Handle title/content update
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch(`/stories/${id}`, {
        title: data.title,
        content: data.content,
      });
      sweetMessage("Story updated successfully!")

      queryClient.invalidateQueries(["story", id]);
      navigate("/dashboard/manage-stories");
    } catch (error) {
      console.error("Failed to update story:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  console.log(story);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Story Title</label>
          <input
            type="text"
            defaultValue={story?.title}
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-1">Story Content</label>
          <textarea
            defaultValue={story?.content}
            {...register("content", { required: true })}
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
        </div>

        {/* Current Images */}
        <div>
          <label className="block font-semibold mb-2">Current Images</label>
          <div className="flex flex-wrap gap-2">
            {story?.images?.map((img, idx) => (
              <div key={idx} className="w-24 h-24 rounded relative">
                <img
                  src={img}
                  alt={`story-${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Image */}
        <div>
          <label className="block font-semibold mb-1">Add New Image</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImage}
            className="btn max-w-1/3"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Story"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStories;