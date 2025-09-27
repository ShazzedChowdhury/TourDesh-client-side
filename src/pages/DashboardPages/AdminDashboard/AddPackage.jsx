import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const imageHostingKey = import.meta.env.VITE_imageBB_api_key; // store key in .env
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddPackage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      tourPlans: [{ day: "", plan: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourPlans",
  });

  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 1. Upload multiple images to imgbb
      const imageUrls = [];
      for (let file of data.images) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(imageHostingApi, {
          method: "POST",
          body: formData,
        });
        const imgData = await res.json();

        if (imgData.success) {
          imageUrls.push(imgData.data.display_url);
        }
      }

      // 2. Prepare package object
      const packageInfo = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        location: data.location,
        images: imageUrls,
        tourPlans: data.tourPlans,
      };

      // 3. Save to backend
      const response = await axiosSecure.post("/packages", packageInfo);

      if (response.data.insertedId) {
        alert("Package added successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error adding package:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Tour Package</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Package Title */}
        <div>
          <label className="block font-semibold mb-1">Package Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">About Tour</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Multiple Images */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            {...register("images", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Tour Plan (Dynamic Fields) */}
        <div>
          <label className="block font-semibold mb-1">Tour Plan</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Day (e.g., Day 1)"
                {...register(`tourPlans.${index}.day`, { required: true })}
                className="input input-bordered flex-1"
              />
              <input
                type="text"
                placeholder="Plan details"
                {...register(`tourPlans.${index}.plan`, { required: true })}
                className="input input-bordered flex-1"
              />
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-sm mt-2"
            onClick={() => append({ day: "", plan: "" })}
          >
            + Add Day
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
