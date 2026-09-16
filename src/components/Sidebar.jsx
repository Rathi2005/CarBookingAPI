import {
  LayoutDashboard,
  Car,
  ClipboardList,
  FileText,
  User,
  LogOut,
  Plus,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Cars",
      path: "/cars",
      icon: Car,
      badge: "4 active",
    },
    {
      name: "Trips",
      path: "/trips",
      icon: ClipboardList,
      badge: "3 today",
    },
    {
      name: "Reports",
      path: "/reports/daily",
      icon: FileText,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="px-4 pt-5">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#173fbe] text-white shadow-sm">
            <Car size={16} strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-[13px] font-extrabold tracking-tight text-[#173fbe]">
              DRIVEOWNER
            </div>
            <div className="text-[9px] font-medium text-slate-500">
              Trip & Fleet Manager
            </div>
          </div>
        </div>

        <Link
          to="/trips/create"
          className="mt-5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#2147c6] text-[11px] font-bold text-white shadow-sm transition hover:bg-[#193dad]"
        >
          <Plus size={14} />
          Create Trip
        </Link>
      </div>

      <nav className="mt-6 flex-1 px-3">
        <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Operations
        </p>

        <div className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex h-9 items-center gap-2.5 rounded-lg px-3 text-[11px] font-semibold transition ${
                    isActive
                      ? "bg-[#173fbe] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={15} strokeWidth={2} />
                <span className="flex-1">{item.name}</span>

                {item.badge && (
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-500 group-[.active]:bg-white/15 group-[.active]:text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
            {(user?.name || "Owner")
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold text-slate-800">
              {user?.name || "Owner"}
            </p>
            <p className="text-[9px] text-slate-500">Fleet Owner</p>
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
