import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import TourGuideStories from '../shared/TourGuideStories/TourGuideStories';

const TourGuideProfile = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // Fetch tour guide info by id
  const { data: guide, isLoading } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${id}`);
      return res.data;
    },
  });

  

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <section className="max-w-lg mx-auto p-6">
        <div className="card shadow-lg bg-base-100">
          <figure className="px-10 pt-10">
            <img
              src={guide.photoURL}
              alt={guide.userName}
              className="w-32 h-32 rounded-full object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{guide.userName}</h2>
            <p className="text-gray-500">{guide.email}</p>
            <div className="mt-4">
              <span className="badge badge-primary">{guide.role}</span>
              {guide.status === "active" ? (
                <span className="badge badge-success ml-2">Active</span>
              ) : (
                <span className="badge badge-error ml-2">Inactive</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <TourGuideStories guide={guide} />
    </div>
  );
};
export default TourGuideProfile;