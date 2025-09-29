import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("")
    const { data: users = [], isLoading, reFetch} = useQuery({
        queryKey: ["users", searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`users?search=${searchTerm}`)
            return res.data
        },
        keepPriviousData: true
    });
    const handleSearch = (e) => {
        e.preventDefault();
        reFetch()
    }

     return (
       <div className="p-6">
         <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

         {/* Search */}
         <form onSubmit={handleSearch} className="flex gap-2 mb-6">
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
               {users.length === 0 ? (
                 <tr>
                   <td colSpan="5" className="text-center py-4">
                     No users found
                   </td>
                 </tr>
               ) : (
                 users.map((user) => (
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
       </div>
     );
};

export default ManageUsers;