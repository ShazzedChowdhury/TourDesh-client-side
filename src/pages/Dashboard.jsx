import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import Loading from "../shared/loading";
import DonorDashboard from "./DashboardPages/DonorDashboard/DonorDashboard";


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
    return <div>Volunteer Dashboard</div>;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
