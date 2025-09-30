import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/loading';

const MeetOurTourGuidesTab = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
       
      // Fetch random 6 tour guides
      const { data: guides = [], isLoading} = useQuery({
        queryKey: ["randomGuides"],
        queryFn: async () => {
          const { data } = await axiosSecure.get("/users/random-guides?limit=6");
          return data;
        },
      });

      if(isLoading) return <Loading />
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="bg-base-100 rounded-lg shadow hover:shadow-lg p-4 text-center"
          >
            <img
              src={guide.photoURL}
              alt={guide.userName}
              className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-bold">{guide.userName}</h3>
            <p className="text-sm text-gray-500">{guide.email}</p>
            <p className="badge block mx-auto badge-success mt-1">
              {guide.role}
            </p>
            <button
              onClick={() => navigate(`/tour-guide-profile/${guide._id}`)}
              className="btn btn-outline btn-sm mt-3"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    );
};

export default MeetOurTourGuidesTab;