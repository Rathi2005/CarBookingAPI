import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../utils/auth";

function DashboardHeader() {
  const user = getCurrentUser();

  const userName =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    "Owner";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1
              className="
            text-3xl 
            font-extrabold 
            tracking-tight 
            text-slate-950
            "
            >
              Welcome back 👋 {userName}
            </h1>

            <span
              className="
            flex 
            items-center 
            gap-2 
            rounded-full 
            bg-emerald-50 
            px-3 
            py-1 
            text-xs 
            font-bold 
            text-emerald-700
            "
            >
              <span
                className="
              h-2 
              w-2 
              rounded-full 
              bg-emerald-500
              "
              />
              API Connected
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Here's what's happening with your cars and trips today.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/cars/add"
            className="
            flex h-11 items-center gap-2
            rounded-xl border border-slate-200
            bg-white px-5
            text-sm font-bold text-slate-700
            hover:bg-slate-50
            "
          >
            <Plus size={17} />
            Add Car
          </Link>

          <Link
            to="/trips/create"
            className="
            flex h-11 items-center gap-2
            rounded-xl bg-[#2147c6]
            px-5 text-sm font-bold text-white
            hover:bg-[#193dad]
            "
          >
            <Plus size={17} />
            Create Trip
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;
