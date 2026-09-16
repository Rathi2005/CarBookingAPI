import { ClipboardList, CheckCircle, Route, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Trips",
    value: "128",
    icon: ClipboardList,
    color: "bg-blue-50 text-blue-600",
  },

  {
    title: "Completed Trips",
    value: "119",
    icon: CheckCircle,
    color: "bg-emerald-50 text-emerald-600",
  },

  {
    title: "Distance Covered",
    value: "4280 km",
    icon: Route,
    color: "bg-indigo-50 text-indigo-600",
  },

  {
    title: "Average Fare",
    value: "₹1950",
    icon: IndianRupee,
    color: "bg-violet-50 text-violet-600",
  },
];

function ReportStats() {
  return (
    <div
      className="
grid
grid-cols-2
xl:grid-cols-4
gap-4
"
    >
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
"
          >
            <div
              className="
flex
justify-between
"
            >
              <div>
                <p
                  className="
text-xs
font-bold
uppercase
text-slate-400
"
                >
                  {item.title}
                </p>

                <h2
                  className="
mt-2
text-3xl
font-extrabold
"
                >
                  {item.value}
                </h2>
              </div>

              <div
                className={`
h-11
w-11
rounded-xl
flex
items-center
justify-center
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

export default ReportStats;
