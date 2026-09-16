import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Route,
} from "lucide-react";

function DailyReport() {
  return (
    <section
      className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
    >
      <div
        className="
flex
flex-col
gap-4
sm:flex-row
sm:items-center
sm:justify-between
mb-6
"
      >
        <div>
          <h2
            className="
text-xl
font-extrabold
text-slate-900
"
          >
            Daily Report
          </h2>

          <p
            className="
text-sm
text-slate-500
mt-1
"
          >
            Track daily trip activity and earnings.
          </p>
        </div>

        <button
          className="
h-10
rounded-xl
border
border-slate-200
px-4
flex
items-center
gap-2
text-sm
font-bold
text-slate-600
"
        >
          <CalendarDays size={16} />
          16 Sep 2026
        </button>
      </div>

      <div
        className="
grid
grid-cols-2
lg:grid-cols-4
gap-4
"
      >
        <div
          className="
rounded-xl
bg-blue-50
p-4
"
        >
          <p className="text-xs font-bold text-blue-600">TOTAL TRIPS</p>

          <h3 className="mt-2 text-3xl font-extrabold">12</h3>
        </div>

        <div
          className="
rounded-xl
bg-emerald-50
p-4
"
        >
          <p className="text-xs font-bold text-emerald-600">COMPLETED</p>

          <h3 className="mt-2 text-3xl font-extrabold">10</h3>
        </div>

        <div
          className="
rounded-xl
bg-red-50
p-4
"
        >
          <p className="text-xs font-bold text-red-600">CANCELLED</p>

          <h3 className="mt-2 text-3xl font-extrabold">2</h3>
        </div>

        <div
          className="
rounded-xl
bg-violet-50
p-4
"
        >
          <p className="text-xs font-bold text-violet-600">EARNINGS</p>

          <h3 className="mt-2 text-3xl font-extrabold">₹18,500</h3>
        </div>
      </div>

      <div
        className="
mt-6
grid
grid-cols-1
md:grid-cols-2
gap-4
"
      >
        <div
          className="
rounded-xl
border
border-slate-100
p-4
flex
items-center
gap-3
"
        >
          <Route className="text-blue-600" />

          <div>
            <p className="text-xs text-slate-400">DISTANCE COVERED</p>

            <p className="font-extrabold">420 km</p>
          </div>
        </div>

        <div
          className="
rounded-xl
border
border-slate-100
p-4
flex
items-center
gap-3
"
        >
          <IndianRupee className="text-emerald-600" />

          <div>
            <p className="text-xs text-slate-400">AVERAGE FARE</p>

            <p className="font-extrabold">₹1540</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyReport;
