import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/sidebar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark text-on-light dark:text-on-dark font-kumb">
      <Sidebar />
      <div className="lg:ml-[350px] p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
