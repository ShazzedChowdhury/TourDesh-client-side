import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../shared/loading";
import ManageProfile from "./DashboardPages/ManageProfile";
import OverviewPage from "./DashboardPages/OverviewPage/OverviewPage";


export default function Dashboard() {
  const { role, loading } = useRole();
  console.log(role)
  if (loading) {
    return <Loading />;
  }

  if (role === "tourist") {
    return <OverviewPage /> ;
  }
  if (role === "tour guide") {
    return <ManageProfile />;
  }

  if (role === "admin") {
    return <OverviewPage />;
  }

  return <Navigate to={"/"} />;
}
