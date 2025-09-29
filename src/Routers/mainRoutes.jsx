import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/HomePage/Home";
import Register from "../pages/AuthPages/Register";
import AuthLayout from "../layouts/AuthLayout";
import SignInPage from "../pages/AuthPages/SignInPage/SignInPage";
import PrivateRoute from "./PrivateRoute";
import AddPackage from "../pages/DashboardPages/Admin/AddPackage";
import ManageUsers from "../pages/DashboardPages/Admin/ManageUsers";
import ManageCandidates from "../pages/DashboardPages/Admin/ManageCandidates";
import ManageProfile from "../pages/DashboardPages/ManageProfile";
import JoinAsTourGuide from "../pages/DashboardPages/Tourist/JoinAsTourGuide";
import AddStories from "../pages/DashboardPages/AddStories";
import ManageStories from "../pages/DashboardPages/ManageStories";
import UpdateStories from "../pages/DashboardPages/UpdateStories";
import PackageDetails from "../pages/PackageDetails";


const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "package-details/:id",
        element: <PackageDetails />,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-packages",
        element: <AddPackage />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-candidates",
        element: <ManageCandidates />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
      {
        path: "join-as-tour-guide",
        element: <JoinAsTourGuide />
      },
      {
        path: "add-stories",
        element: <AddStories />
      },
      {
        path: "manage-stories",
        element: <ManageStories />
      },
      {
        path: "update-stories/:id",
        element: <UpdateStories />
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <SignInPage />,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default mainRoutes;
