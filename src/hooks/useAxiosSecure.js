import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  const accessToken = localStorage.getItem("access-token")
  const instance = axios.create({
    baseURL: "https://tour-desh-server-side.vercel.app/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });


  return instance;
};

export default useAxiosSecure;
