import { Outlet } from "react-router";
import DashboardSidebar from "../shared/Dashboard/DashboardSidebar";
import LifeDrop from "../shared/LifeDrop/LifeDrop";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full  lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <LifeDrop />
          </div>
        </div>
        {/* Page content here */}
        <Outlet />
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="mb-2 px-2 py-2 hidden lg:block border-b-2 border-[#2E2E2E]">
            <LifeDrop />
          </div>
          {/* Sidebar content here */}
          <DashboardSidebar />
          {/* <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li> */}
        </ul>
      </div>
    </div>
    // <div className="min-h-screen flex bg-gray-100">
    //   {/* Sidebar */}
    //   <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
    //     <div className="text-2xl font-bold mb-10 text-center text-blue-600">
    //       BookSwap Hub
    //     </div>
    //     <DashboardSidebar />
    //   </aside>

    //   {/* Main Content */}
    //   <div className="flex-1 p-4 md:p-6">
    //     <Outlet />
    //   </div>
    // </div>
  );
};

export default DashboardLayout;
