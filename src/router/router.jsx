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
import AllMeals from "../Pages/AdminDashboard/AllMeals/AllMeals";
import AddProfile from "../Pages/AdminDashboard/AddProfile/AddProfile";
import AdminRoute from "./AdminRoute";
import UpdateItems from "../Pages/AdminDashboard/UpdateItems/UpdateItems";
import MealDetail from "../components/MealDetail/MealDetail";
import RequestMeal from "../Pages/MyDashboard/RequestMeal";
import MyProfile from "../Pages/MyDashboard/MyProfile";
import MyReview from "../Pages/MyDashboard/MyReview";
import Payment from "../Pages/MyDashboard/Payment";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Meal from "../Pages/Meal/Meal";
import CheckOut from "../Pages/CheckOut.jsx/CheckOut";
import AllReview from "../Pages/AdminDashboard/AllReview.jsx/AllReview";
import SarveMeal from "../Pages/AdminDashboard/SarveMeal/SarveMeal";
import Contact from "../Pages/Contact/Contact";
import Review from "../Pages/Review/Review";
import Membership from "../Pages/MemberShip/MemberShip";

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
                path: 'mealDetails/:id',
                element: <PrivateRoute><MealDetail></MealDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment-12-ashen.vercel.app/meal/${params.id}`),
            },
            {
                path: 'meal',
                element: <Meal></Meal>
            },
            {
                path: '/checkout/:membership',
                element: <CheckOut></CheckOut>
            },
            {
                path: 'join-us',
                element: <JoinUs></JoinUs>
            },
            {
                path: 'signIn',
                element: <SignIn></SignIn>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'membership',
                element: <Membership></Membership>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            },
            {
                path: 'review',
                element: <Review></Review>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'requestMeal',
                element: <RequestMeal></RequestMeal>
            },
            {
                path: 'myReview',
                element: <MyReview></MyReview>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            // admin route
            {
                path: 'addMeal',
                element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
            },
            {
                path: 'manageUser',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'allMeal',
                element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
            },
            {
                path: 'adminProfile',
                element: <AdminRoute><AddProfile></AddProfile></AdminRoute>
            },
            {
                path: 'allReview',
                element: <AdminRoute><AllReview></AllReview></AdminRoute>
            },
            {
                path: 'serve',
                element: <AdminRoute><SarveMeal></SarveMeal></AdminRoute>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
                loader: ({ params }) => fetch(`https://assignment-12-ashen.vercel.app/meal/${params.id}`)
            },
        ]
    }
]);

export default router