import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/loading';
import { useForm } from 'react-hook-form';
import sweetMessage from '../../Utils/sweetMessage';
import { useNavigate } from 'react-router';

const ManageProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { user, updateUser, setUser } = useAuth();
    const { role, loading } = useRole();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: stats = [], isloading } = useQuery({
        queryKey: ["stats"],
        queryFn: async() => {
            const res = await axiosSecure.get("admin-stats");
            return res.data;
        }
    })

    const { register, handleSubmit, reset} = useForm();

    console.log(role)
    const openModal = () => {
        reset({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        });

        setIsModalOpen(true)
    }

    const onSubmit = async (data) => {
        setUploading(true);
        try {
          let photoURL = user.photoURL;

          // Upload file to imgbb if new file is selected
          if (data.photoFile?.length > 0) {
            const formData = new FormData();
            formData.append("image", data.photoFile[0]);

            const imgbbKey = import.meta.env.VITE_imageBB_api_key;
            const res = await fetch(
              `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
              {
                method: "POST",
                body: formData,
              }
            );
            const imgData = await res.json();
            if (imgData.success) {
              photoURL = imgData.data.display_url;
            }
          }

          const updatedInfo = {
            displayName: data.displayName,
            photoURL,
          };

          //Update the user info in firebase
          updateUser(updatedInfo)
          .then( async() => {
              // Send updated info to backend
              const res = await axiosSecure.patch(
                `/users-info/${user.email}`,
                {updatedInfo}
              );
              if (res.data.modifiedCount > 0) {
                setUser((prev) => ({
                    ...prev,
                    ...updatedInfo
                }))
                sweetMessage("Profile updated successfully!");
              }
          })
          .catch((err) => console.log(err))


          setIsModalOpen(false);
        } catch (error) {
          console.error("Failed to update profile:", error);
        } finally {
          setUploading(false);
        }
    }

    if(isloading || loading) {
        return <Loading />
    }

    return (
      <div className="p-6 space-y-6">
        {/* Welcome Message */}
        <h2 className="text-2xl font-bold">
          Welcome Back,{" "}
          <span className="text-blue-600">{user?.displayName}</span> 🎉
        </h2>

        {/* Admin Stats Section */}
        {role === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat bg-white shadow p-4 rounded-xl">
              <h3 className="font-semibold">Total Payment</h3>
              <p className="text-xl font-bold text-green-600">
                ${stats.totalPayment || 0}
              </p>
            </div>
            <div className="stat bg-white shadow p-4 rounded-xl">
              <h3 className="font-semibold">Total Tour Guides</h3>
              <p className="text-xl font-bold">{stats.totalGuides || 0}</p>
            </div>
            <div className="stat bg-white shadow p-4 rounded-xl">
              <h3 className="font-semibold">Total Packages</h3>
              <p className="text-xl font-bold">{stats.totalPackages || 0}</p>
            </div>
            <div className="stat bg-white shadow p-4 rounded-xl">
              <h3 className="font-semibold">Total Clients</h3>
              <p className="text-xl font-bold">{stats.totalClients || 0}</p>
            </div>
            <div className="stat bg-white shadow p-4 rounded-xl">
              <h3 className="font-semibold">Total Stories</h3>
              <p className="text-xl font-bold">{stats.totalStories || 0}</p>
            </div>
          </div>
        )}

        {/* Admin Info */}
        <div className="flex flex-col items-center gap-4 bg-gray-100 p-5 rounded-lg shadow sm:w-full lg:w-1/2 mt-10 mx-auto text-center">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-36 h-36 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>
            <p className="text-lg text-gray-600">
              Role: {loading ? "loading...." : role}
            </p>
            <p className="text-lg text-gray-500">Email: {user?.email}</p>
          </div>
          <div className={`${role === "tourist" && "md:flex gap-2 "}`}>
            {role === "tourist" && (
              <button
                className="btn btn-primary btn-md btn-outline"
                onClick={() => navigate("/dashboard/join-as-tour-guide")}
              >
                Apply for tour guide
              </button>
            )}
            <button className="btn btn-primary btn-md" onClick={openModal}>
              Edit
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box relative">
              <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    {...register("displayName", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Upload Photo */}
                <div>
                  <label className="block font-semibold mb-1">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photoFile")}
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default ManageProfile;