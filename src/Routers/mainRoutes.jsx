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
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationDetailsPage from "../pages/DonationDetailsPage/DonationDetailsPage";
import SearchDonors from "../pages/SearchDonors";
import BlogPage from "../pages/BlogPage";
import BlogDetails from "../pages/BlogDetails";
import AddPackage from "../pages/DashboardPages/Admin/AddPackage";
import ManageUsers from "../pages/DashboardPages/Admin/ManageUsers";
import ManageCandidates from "../pages/DashboardPages/Admin/ManageCandidates";
import ManageProfile from "../pages/DashboardPages/ManageProfile";
import JoinAsTourGuide from "../pages/DashboardPages/Tourist/JoinAsTourGuide";


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
        path: "donation-ruquests",
        element: <DonationRequests />,
      },
      {
        path: "search",
        element: <SearchDonors />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "/blogs-details/:id",
        element: <BlogDetails />,
      },
      {
        path: "request-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetailsPage />
          </PrivateRoute>
        ),
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
