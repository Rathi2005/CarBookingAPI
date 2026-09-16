import { Car, ClipboardList, CheckCircle2, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Cars",
    value: "4",
    desc: "Active fleet",
    icon: Car,
    color: "bg-blue-50 text-blue-600",
  },

  {
    title: "Total Trips",
    value: "128",
    desc: "+14% vs last month",
    icon: ClipboardList,
    color: "bg-indigo-50 text-indigo-600",
  },

  {
    title: "Completed Trips",
    value: "119",
    desc: "93% success",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },

  {
    title: "Total Earnings",
    value: "₹2,48,500",
    desc: "This month",
    icon: IndianRupee,
    color: "bg-violet-50 text-violet-600",
  },
];

function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
hover:shadow-md
transition
"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-xs text-slate-500">{item.desc}</p>
              </div>

              <div
                className={`
flex
h-11
w-11
items-center
justify-center
rounded-xl
${item.color}
`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;
