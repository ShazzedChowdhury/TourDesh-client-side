import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../loading';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const TourGuideStories = ({ guide }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`stories?email=${guide?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if(stories.length === 0) return;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Stories</h2>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourGuideStories;