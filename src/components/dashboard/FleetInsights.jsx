import { IndianRupee, AlertCircle } from "lucide-react";

function FleetInsights() {
  return (
    <div
      className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
"
    >
      <h2
        className="
text-lg
font-extrabold
text-slate-900
mb-5
"
      >
        Fleet Health & Insights
      </h2>

      <div
        className="
space-y-4
"
      >
        <div
          className="
rounded-xl
bg-emerald-50
p-4
flex
gap-3
"
        >
          <IndianRupee className="text-emerald-600" />

          <div>
            <p
              className="
text-sm
font-bold
text-emerald-800
"
            >
              Top Revenue Car
            </p>

            <p
              className="
font-extrabold
text-slate-900
"
            >
              Toyota Innova Crysta
            </p>

            <p
              className="
text-xs
text-slate-500
"
            >
              ₹64,200 collected this month
            </p>
          </div>
        </div>

        <div
          className="
rounded-xl
bg-amber-50
p-4
flex
gap-3
"
        >
          <AlertCircle className="text-amber-600" />

          <div>
            <p
              className="
text-sm
font-bold
text-amber-800
"
            >
              Compliance Reminder
            </p>

            <p
              className="
font-extrabold
text-slate-900
"
            >
              Insurance Renewal
            </p>

            <p
              className="
text-xs
text-slate-500
"
            >
              Due in 24 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FleetInsights;
