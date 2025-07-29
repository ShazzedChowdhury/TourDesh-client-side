import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });


  useEffect(() => {
  }, [])
  

  return instance;
};

export default useAxiosSecure;
