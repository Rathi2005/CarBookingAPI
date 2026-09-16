import { Search, Bell, Wifi } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-[58px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-7">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#173fbe] text-white">
            <span className="text-xs font-black">D</span>
          </div>
          <div className="hidden xs:block">
            <p className="text-[11px] font-extrabold tracking-tight text-[#173fbe]">
              DRIVEOWNER
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[9px] font-semibold text-slate-500">
            Fleet active • 4/4 Available
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden w-[250px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search trips, plates, drivers..."
              className="w-full bg-transparent text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
            />
            <span className="rounded border border-slate-200 bg-white px-1 text-[8px] text-slate-400">
              /
            </span>
          </div>

          <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50">
            <Bell size={16} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-700">
              {(user?.name || "O")
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
