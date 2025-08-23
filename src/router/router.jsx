import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

const router = createBrowserRouter([
    //  create your routes here
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            {
                path: '/auth/signin',
                Component: SignIn
            },
            {
                path: "/auth/signup",
                Component: SignUp
            }
        ]
    }
])

export default router;