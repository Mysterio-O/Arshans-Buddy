import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `https://arshans-buddy-server.onrender.com` // Change this to your public API base URL
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;