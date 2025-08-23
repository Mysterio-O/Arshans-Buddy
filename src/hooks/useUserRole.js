import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {

    const { user, loading: AuthLoading } = useAuth(); // collecting user info and loading using useAuth custom hook
    const shouldFetch = !AuthLoading && !!user?.email; // fetch only when user is true and AuthLoading is false
    const axiosSecure = useAxiosSecure();

    const { data: role = "user", isLoading: roleLoading, refetch } = useQuery({
        enabled: shouldFetch, // executes the function only when shouldFetch is true
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}/role`) // adjust your API here
            return res.data?.role // adjust your data path here
        },
        staleTime: 0,
        refetchOnWindowFocus: true
    })

    // console.log(role);


    return { role, role_loading: AuthLoading || roleLoading, refetch }
};

export default useUserRole;