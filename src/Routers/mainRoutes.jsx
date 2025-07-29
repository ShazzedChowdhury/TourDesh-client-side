import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Register from "../pages/AuthPages/Register";
import AuthLayout from "../layouts/AuthLayout";
import SignInPage from "../pages/AuthPages/SignInPage/SignInPage";
import CreateDonationRequest from "../pages/DashboardPages/DonorDashboard/CreateDonationRequest";
import UpdateDonationRequest from "../pages/DashboardPages/DonorDashboard/UpdateDonationRequest";
import PrivateRoute from "./PrivateRoute";
import MyDonationRequests from "../pages/DashboardPages/DonorDashboard/MyDonationRequests";
import AllUsers from "../pages/DashboardPages/AdminDashboard/AllUsers";
import AllDonationRequests from "../pages/DashboardPages/AdminDashboard/AllDonationRequests";
import ContentManagement from "../shared/Dashboard/ContentManagement";
import AddBlog from "../shared/Dashboard/AddBlog";
import DonationRequests from "../pages/DonationRequests/DonationRequests";

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
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `http://localhost:5000/details/${params.bookId}`
          );
          return data;
        },
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
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      {
        path: "update-donation-request/:id",
        element: <UpdateDonationRequest />,
      },
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
