import { Car, CheckCircle2, Activity, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Cars",
    value: "4",
    desc: "Registered vehicles",
    icon: Car,
    color: "bg-blue-50 text-blue-600",
  },

  {
    title: "Available",
    value: "3",
    desc: "Ready for trips",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },

  {
    title: "On Trip",
    value: "1",
    desc: "Currently running",
    icon: Activity,
    color: "bg-indigo-50 text-indigo-600",
  },

  {
    title: "Revenue",
    value: "₹2.48L",
    desc: "This month",
    icon: IndianRupee,
    color: "bg-violet-50 text-violet-600",
  },
];

function CarStats() {
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
hover:shadow-md
transition
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
text-slate-900
"
                >
                  {item.value}
                </h2>

                <p
                  className="
mt-2
text-xs
text-slate-500
"
                >
                  {item.desc}
                </p>
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

export default CarStats;
