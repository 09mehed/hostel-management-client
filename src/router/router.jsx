import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../components/Main/Main";
import SignIn from "../Pages/Signin/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../components/Home/Home";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/UserDashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AddMeal from "../Pages/AdminDashboard/AddMeal/AddMeal";
import ManageUser from "../Pages/AdminDashboard/ManageUser/ManageUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            
            {
                path: 'signIn',
                element: <SignIn></SignIn>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            // admin route
            {
                path: 'addMeal',
                element: <AddMeal></AddMeal>
            },
            {
                path: 'manageUser',
                element: <ManageUser></ManageUser>
            }
        ]
    }
]);

export default router