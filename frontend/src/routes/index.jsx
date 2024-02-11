import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {useAuth} from "../provider/authProvider";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "../pages/user/Login";
import Logout from "../pages/user/Logout";
import Register from "../pages/user/Register";
import Index from "../pages/Index";
import Profile from "../pages/user/Profile";

const Routes = () => {
    const {token} = useAuth();

    const nonAuthenticatedRoutes = [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />,
        },
    ];

    const authenticatedRoutes = [
        {
            path: "/",
            element: <ProtectedRoute/>,
            children: [
                {
                    path: "/",
                    element: <Index />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    path: "/logout",
                    element: <Logout />,
                },
            ],
        }
    ]

    const router = createBrowserRouter([
        ...(!token ? nonAuthenticatedRoutes : []),
        ...authenticatedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;