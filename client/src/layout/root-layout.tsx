import { Outlet } from "react-router-dom";

import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { FabButton } from "../components/fab-button";
import { Modals } from "../components/modals";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark text-on-light dark:text-on-dark font-kumb transition duration-300">
      <Sidebar />
      <div className="lg:ml-[350px] p-4 min-h-screen">
        <Header />
        <Outlet />
        <FabButton />
        <Modals />
      </div>
    </div>
  );
};

export default RootLayout;
