import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Select from "react-select";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Pagination from '../../../shared/Pagination/Pagination';


const roleOptions = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "tour guide", label: "Tour Guide" },
  { value: "tourist", label: "Tourist" },
];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [ page, setPage ] = useState(1);

  // Fetch users with search + role filter
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchTerm, selectedRole, page],
    queryFn: async () => {
      let url = `users?search=${searchTerm}&page=${page}&limit=${10}`;
       if (selectedRole.value !== "all") {
         url += `&role=${selectedRole.value}`;
       }
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPriviousData: true,
  });
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/* Filters: Search + Role */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div className="w-60">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={(option) => {
              setSelectedRole(option);
              refetch(); // refetch on role change
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Photo</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              data?.users.map((user) => (
                <tr key={user?._id}>
                  <td>
                    <img
                      src={user?.photoURL}
                      alt={user?.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{user?.userName}</td>
                  <td>{user?.email}</td>
                  <td>
                    <span className="font-semibold">{user.role}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user?.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={data?.page}
        totalPages={data?.pages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ManageUsers;