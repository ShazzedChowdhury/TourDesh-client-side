import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../shared/loading";
import DonorDashboard from "./DashboardPages/DonorDashboard/DonorDashboard";
import VolunteerDashboard from "./DashboardPages/VolunteerDashboard/VolunteerDashboard";
import AdminDashboard from "./DashboardPages/AdminDashboard/AdminDashboard";


export default function Dashboard() {
  const { role, loading } = useRole();
  console.log(role)
  if (loading) {
    return <Loading />;
  }

  if (role === "donor") {
    return <DonorDashboard /> ;
  }
  if (role === "volunteer") {
    return <VolunteerDashboard />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
