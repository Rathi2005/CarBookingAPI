import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const trips = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    car: "Toyota Innova Crysta",
    route: "Delhi → Gurgaon",
    distance: "42 km",
    amount: "₹1,800",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Priya Patel",
    initials: "PP",
    car: "Maruti Suzuki Ertiga",
    route: "Noida → IGI Airport",
    distance: "38 km",
    amount: "₹1,450",
    status: "In Progress",
    statusStyle: "bg-blue-50 text-blue-700",
  },
  {
    name: "Amit Verma",
    initials: "AV",
    car: "Hyundai Creta",
    route: "Delhi → Faridabad",
    distance: "34 km",
    amount: "₹1,200",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
];

function RecentTrips() {
  return (
    <div
      className="
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
"
    >
      <div
        className="
flex
items-center
justify-between
border-b
border-slate-100
px-5
py-4
"
      >
        <h2
          className="
text-lg
font-extrabold
text-slate-900
"
        >
          Recent Trips
        </h2>

        <Link
          to="/trips"
          className="
flex
items-center
gap-1
text-sm
font-bold
text-[#2147c6]
"
        >
          View All
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {trips.map((trip) => (
          <div
            key={trip.name}
            className="
flex
items-center
justify-between
gap-4
px-5
py-4
"
          >
            <div className="flex items-center gap-4">
              <div
                className="
flex
h-11
w-11
items-center
justify-center
rounded-full
bg-slate-100
font-bold
text-slate-600
"
              >
                {trip.initials}
              </div>

              <div>
                <p
                  className="
font-bold
text-slate-800
"
                >
                  {trip.name}
                </p>

                <p
                  className="
text-sm
text-slate-500
"
                >
                  {trip.car}
                </p>

                <p
                  className="
text-xs
text-slate-400
mt-1
"
                >
                  {trip.route} • {trip.distance}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className="
text-lg
font-extrabold
text-slate-900
"
              >
                {trip.amount}
              </p>

              <span
                className={`
inline-flex
rounded-full
px-3
py-1
text-xs
font-bold
${trip.statusStyle}
`}
              >
                {trip.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTrips;
