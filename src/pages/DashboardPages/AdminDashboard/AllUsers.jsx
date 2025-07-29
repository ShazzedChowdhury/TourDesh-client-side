import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const [users, setUsers] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosSecure.get(`/all-users?page=${page}&filter=${filter}`).then((res) => {
      setUsers(res.data.users);
      setTotalPages(Math.ceil(res.data.totalCount / 5));
      setLoading(false);
    });
  }, [user, page, filter, reFetch]);

  const handleStatusToggle = async (id, status) => {
    // const newStatus = status === "active" ? "blocked" : "active";
    // await axiosSecure.patch(`/user/status/${id}`, { status: newStatus });
    // setUsers((prev) =>
    //   prev.map((user) =>
    //     user._id === id ? { ...user, status: newStatus } : user
    //   )
    // );
  };

  const handleRoleChange = async (id, newRole) => {
    // await axiosSecure.patch(`/user/role/${id}`, { role: newRole });
    // setUsers((prev) =>
    //   prev.map((user) => (user._id === id ? { ...user, role: newRole } : user))
    // );
  };

  if (loading) return <Loading />;
  console.log(totalPages)
  return (
    <div className="p-4">
      <div className="flex justify-between items-center py-5">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          All Registered Users
        </h2>

        <select
          className="h-fit p-3 border border-gray-200 rounded-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Block</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/2kR9vVp/avatar.png"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.userName}</td>
                <td className="capitalize">{user.role}</td>
                <td className="capitalize">{user.status}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn btn-sm btn-outline">
                      <FaEllipsisV />
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 space-y-1 -top-10 right-12 ">
                      {user.status === "active" ? (
                        <li>
                          <button
                            onClick={() =>
                              handleStatusToggle(user._id, user.status)
                            }
                          >
                            Block
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() =>
                              handleStatusToggle(user._id, user.status)
                            }
                          >
                            Unblock
                          </button>
                        </li>
                      )}
                      {user.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() =>
                              handleRoleChange(user._id, "volunteer")
                            }
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}
                      {user.role !== "admin" && (
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, "admin")}
                          >
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center p-5 text-gray-500">
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {users.length !== 0 && (
        <div className="m-4 flex justify-center items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded border ${
                page === idx + 1 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
