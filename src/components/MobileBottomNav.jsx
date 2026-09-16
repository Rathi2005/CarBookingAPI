import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, ClipboardList, BarChart3, User } from "lucide-react";

function MobileBottomNav() {
  const links = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "Cars", path: "/cars", icon: Car },
    { name: "Trips", path: "/trips", icon: ClipboardList },
    { name: "Reports", path: "/reports/daily", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-w-[54px] flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[9px] font-semibold ${
                  isActive ? "text-[#173fbe]" : "text-slate-400"
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
