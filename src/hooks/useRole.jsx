import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure(`/get-user-role?email=${user.email}`).then((res) => {
      setRole(res.data.role);
      setLoading(false);
    });
  });
  return { role, loading };
}
