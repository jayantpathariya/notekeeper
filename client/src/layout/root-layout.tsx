import { Outlet } from "react-router-dom";

import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark text-on-light dark:text-on-dark font-kumb transition duration-300">
      <Sidebar />
      <div className="lg:ml-[350px] p-4">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
