import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileBottomNav from "../components/MobileBottomNav";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main application */}
      <div className="min-h-screen lg:ml-[224px]">
        <Topbar />

        <main className="px-4 pb-24 pt-4 sm:px-6 lg:px-7 lg:pb-8">
          <div className="mx-auto w-full max-w-[1440px]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileBottomNav />
    </div>
  );
}

export default DashboardLayout;
