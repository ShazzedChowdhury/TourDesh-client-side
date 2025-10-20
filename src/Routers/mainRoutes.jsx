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
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import TourGuideProfile from "../pages/TourGuideProfile";
import AllTrips from "../pages/AllTripsPackages";
import MyBookings from "../pages/DashboardPages/Tourist/MyBookings";
import PaymentPage from "../pages/DashboardPages/Payment/PaymentPage";
import MyAssignedTours from "../pages/DashboardPages/TourGuide/MyAssignedTours";
import AllStories from "../pages/CommunityPage";
import AboutUsPage from "../pages/AboutUsPage";
import ForgetPasswordPage from "../pages/AuthPages/ForgetPasswordPage";
import OverviewPage from "../pages/DashboardPages/OverviewPage/OverviewPage";


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
      {
        path: "tour-guide-profile/:id",
        element: <TourGuideProfile />,
      },
      {
        path: "all-trips",
        element: <AllTrips />,
      },
      {
        path: "all-stories",
        element: <AllStories />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
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
        path: "overview",
        element: <OverviewPage />,
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
        element: <JoinAsTourGuide />,
      },
      {
        path: "add-stories",
        element: <AddStories />,
      },
      {
        path: "manage-stories",
        element: <ManageStories />,
      },
      {
        path: "update-stories/:id",
        element: <UpdateStories />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "my-assigned-tours",
        element: <MyAssignedTours />,
      },
      {
        path: "payment/:bookingId",
        element: <PaymentPage />,
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
      {
        path: "/forget-pass",
        element: <ForgetPasswordPage />
      },
    ],
  },
]);

export default mainRoutes;
