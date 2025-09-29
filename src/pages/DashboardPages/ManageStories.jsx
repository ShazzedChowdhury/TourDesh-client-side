import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../shared/loading';
import sweetMessage from '../../Utils/sweetMessage';

const ManageStories = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const navigate = useNavigate();
     const queryClient = useQueryClient();
     const [deletingId, setDeletingId] = useState(null);

     const { data: stories = [], isLoading, refetch} = useQuery({
        queryKey: ["user-stories"],
        queryFn: async () => {
            const res = await axiosSecure.get(`stories?email=${user?.email}`);
            return res.data
        }
     })


     const handleDelete = async (id) => {
       try {
         setDeletingId(id);
         const res = await axiosSecure.delete(`stories/${id}`);
         if(res.data.deletedCount) {
            sweetMessage("Story deleted successfully!")
            queryClient.invalidateQueries(["user-stories"])
         }
       } catch (error) {
         console.error("Failed to delete story:", error);
       } finally {
         setDeletingId(null);
       }
     }
     
     if(isLoading) return <Loading />;
     console.log(stories)
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Your Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col"
            >
              {/* Image slider */}
              {story.images?.length > 0 && (
                <div className="mb-3">
                  <div className="overflow-x-auto flex gap-2">
                    {story.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`story-${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Story Title */}
              <h3 className="font-semibold text-lg mb-2">{story.title}</h3>

              {/* Story Content */}
              <p className="text-sm text-gray-600 mb-4">
                {story.content.length > 100
                  ? story.content.slice(0, 100) + "..."
                  : story.content}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-primary flex-1"
                  onClick={() =>
                    navigate(`/dashboard/update-stories/${story._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error flex-1"
                  onClick={() => handleDelete(story._id)}
                  disabled={deletingId === story._id}
                >
                  {deletingId === story._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ManageStories;