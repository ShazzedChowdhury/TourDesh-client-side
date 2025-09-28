import { NavLink } from "react-router";
import useRole from "../../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-red-100 text-primary"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  if (loading) return <h1>Loading...</h1>;

  if (role === "admin")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Dashboard"
        />
        <NavItem
          to="/dashboard/manage-users"
          // icon={<Plus size={20} />}
          label="Manage users"
        />
        <NavItem
          to="/dashboard/add-packages"
          // icon={<BookOpen size={20} />}
          label="Add packages"
        />
        <NavItem
          to="/dashboard/content-management"
          // icon={<List size={20} />}
          label="Content Management"
        />
        <NavItem
          to="/dashboard/profile"
          // icon={<User size={20} />}
          label="My Profile"
        />
      </nav>
    );
  if (role === "volunteer")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Dashboard"
        />
        <NavItem
          to="/dashboard/all-blood-donation-request"
          // icon={<BookOpen size={20} />}
          label="All Donation Requests"
        />
        <NavItem
          to="/dashboard/content-management"
          // icon={<List size={20} />}
          label="Content Management"
        />
        <NavItem
          to="/dashboard/profile"
          // icon={<User size={20} />}
          label="My Profile"
        />
      </nav>
    );

  // donor sidebar
  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard"
        // icon={<Home size={20} />}
        label="Dashboard"
      />

      <NavItem
        to="/dashboard/my-donation-requests"
        // icon={<Plus size={20} />}
        label="My Donation Requests"
      />
      <NavItem
        to="/dashboard/create-donation-request"
        // icon={<List size={20} />}
        label="Create Donation Request"
      />
      <NavItem
        to="/dashboard/profile"
        // icon={<User size={20} />}
        label="Profile"
      />
    </nav>
  );
}
