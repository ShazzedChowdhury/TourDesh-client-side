import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../shared/loading";
import ManageProfile from "./DashboardPages/ManageProfile";


export default function Dashboard() {
  const { role, loading } = useRole();
  console.log(role)
  if (loading) {
    return <Loading />;
  }

  if (role === "tourist") {
    return <ManageProfile /> ;
  }
  if (role === "tour guide") {
    return <ManageProfile />;
  }

  if (role === "admin") {
    return <ManageProfile />;
  }

  return <Navigate to={"/"} />;
}
