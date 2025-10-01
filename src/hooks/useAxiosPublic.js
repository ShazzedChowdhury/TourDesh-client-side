import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://tour-desh-server-side.vercel.app/",
  });

  return instance;
};

export default useAxiosPublic;
