import { NavLink } from "react-router";
import useRole from "../../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-[#ddf5f6] text-primary"
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
          to="/dashboard/overview"
          // icon={<List size={20} />}
          label="Overview"
        />
        <NavItem
          to="/dashboard/manage-profile"
          // icon={<List size={20} />}
          label="Manage profile"
        />
        <NavItem
          to="/dashboard/add-packages"
          // icon={<List size={20} />}
          label="Add package"
        />
        <NavItem
          to="/dashboard/manage-users"
          // icon={<Plus size={20} />}
          label="Manage users"
        />
        <NavItem
          to="/dashboard/manage-candidates"
          // icon={<BookOpen size={20} />}
          label="Manage candidates"
        />
      </nav>
    );
  if (role === "tour guide")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard/manage-profile"
          // icon={<List size={20} />}
          label="Manage Profile"
        />
        <NavItem
          to="/dashboard/my-assigned-tours"
          // icon={<List size={20} />}
          label="My Assigned Tours"
        />
        <NavItem
          to="/dashboard/add-stories"
          // icon={<Plus size={20} />}
          label="Add Stories"
        />
        <NavItem
          to="/dashboard/manage-stories"
          // icon={<Plus size={20} />}
          label="Manage Stories"
        />
      </nav>
    );

  // tourist sidebar
  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard/Overview"
        // icon={<List size={20} />}
        label="Overview"
      />
      <NavItem
        to="/dashboard/manage-profile"
        // icon={<List size={20} />}
        label="Manage Profile"
      />
      <NavItem
        to="/dashboard/my-bookings"
        // icon={<List size={20} />}
        label="My Bookings"
      />
      <NavItem
        to="/dashboard/join-as-tour-guide"
        // icon={<Plus size={20} />}
        label="Join As Tour Guide"
      />
      <NavItem
        to="/dashboard/add-stories"
        // icon={<Plus size={20} />}
        label="Add Stories"
      />
      <NavItem
        to="/dashboard/manage-stories"
        // icon={<Plus size={20} />}
        label="Manage Stories"
      />
    </nav>
  );
}
