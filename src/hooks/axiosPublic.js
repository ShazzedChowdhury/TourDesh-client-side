import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://a12-c01-life-drop-server-side.vercel.app/",
  });

  return instance;
};

export default useAxiosPublic;
