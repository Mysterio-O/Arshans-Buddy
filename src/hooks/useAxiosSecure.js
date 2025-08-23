import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: `https://life-drop-server.vercel.app`
});

const useAxiosSecure = () => {

    // step 1- using useAuth hook to get user information and logout function
    const { user, userLogOut } = useAuth();
    // console.log(user.accessToken);


    const navigate = useNavigate();


    // step 2- stop execution and return if user is not available
    if (!user) return;


    // step 3- add the access token which is coming from firebase to the axios instance so that user don't have to manually add it to every request
    axiosSecure.interceptors.request.use(config => {

        // adding token in the config header and returning the config
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
    }, error => {

        // if there is an error in the request, log it and return a rejected promise
        return Promise.reject(error);
    });


    // step 4- intercepting the response to manage role based access and handle unauthorized access and handle error globally
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error?.status;
        if (status === 403) {
            navigate('/forbidden');
        } else if (status === 401) {
            userLogOut()
                .then(() => {
                    navigate('/login');
                })
                .catch(err => {
                    console.log('error from response interceptor in axiosSecure', err);
                })
        };
        Promise.reject(error);
    })

    // step 5- return the axiosSecure instance so that it can be used in other hooks or components
    return axiosSecure;
}
export default useAxiosSecure;