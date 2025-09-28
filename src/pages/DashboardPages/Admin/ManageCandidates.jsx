import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/loading';

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //Fetch all applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Mutation: Accept candidate (update role + remove application)
  const acceptMutation = useMutation({
     mutationFn: async (application) => {
       // 1. Update user role
       await axiosSecure.patch(`users/${application.email}`, {
         role: "tour guide",
       });
       // 2. Delete application
       return await axiosSecure.delete(`applications/${application._id}`);
     },
     onSuccess: () => {
        queryClient.invalidateQueries(["applications"]);
     }
  })

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Candidates</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Photo</th>
              <th>Application Title</th>
              <th>Reason</th>
              <th>CV</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>
                  <img
                    src={app.photoURL}
                    alt={app.userName}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{app.title}</td>
                <td>{app.reason}</td>
                <td>
                  <a
                    href={app.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View CV
                  </a>
                </td>
                <td>{app.role}</td>
                <td className="space-x-2">
                  <button
                    //   onClick={() => acceptMutation.mutate(app)}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>
                  <button
                    //   onClick={() => rejectMutation.mutate(app._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCandidates;