import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  const accessToken = localStorage.getItem("access-token")
  console.log("access-token", accessToken)
  console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);
  const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });


  useEffect(() => {
  }, [])
  

  return instance;
};

export default useAxiosSecure;
