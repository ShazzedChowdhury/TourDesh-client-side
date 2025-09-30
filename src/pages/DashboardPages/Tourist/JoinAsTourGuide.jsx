import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import sweetMessage from "../../../Utils/sweetMessage";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const application = {
      title: data.title,
      reason: data.reason,
      cvLink: data.cvLink,
      applicantEmail: user?.email,
      photoURL: user?.photoURL,
      applicantName: user?.displayName,
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/applications", application);
      if (res.data.insertedId) {
        sweetMessage("Appllication is successfull!")
        reset();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      sweetMessage("Something went wrong! Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-xl rounded-md">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Join as a Tour Guide
      </h2>

      {/* Application Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Application Title */}
        <div>
          <label className="block font-semibold mb-1">Application Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter your application title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Why to be a Tour Guide */}
        <div>
          <label className="block font-semibold mb-1">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register("reason", { required: true })}
            placeholder="Write your motivation here..."
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        </div>

        {/* CV Link */}
        <div>
          <label className="block font-semibold mb-1">CV Link</label>
          <input
            type="url"
            {...register("cvLink", { required: true })}
            placeholder="https://your-cv-link.com"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
