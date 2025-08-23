import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `http://localhost:5000` // Change this to your public API base URL
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;