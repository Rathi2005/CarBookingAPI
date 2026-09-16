import { IndianRupee, TrendingUp } from "lucide-react";

function RevenueCard() {
  return (
    <div
      className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
    >
      <div className="flex justify-between">
        <div>
          <p
            className="
text-xs
font-bold
uppercase
text-slate-400
"
          >
            Monthly Revenue
          </p>

          <h2
            className="
mt-3
text-4xl
font-extrabold
text-slate-950
"
          >
            ₹2,48,500
          </h2>

          <div
            className="
mt-3
flex
items-center
gap-2
text-sm
font-bold
text-emerald-600
"
          >
            <TrendingUp size={16} />
            +12.5% compared to last month
          </div>
        </div>

        <div
          className="
h-12
w-12
rounded-xl
bg-emerald-50
text-emerald-600
flex
items-center
justify-center
"
        >
          <IndianRupee size={24} />
        </div>
      </div>
    </div>
  );
}

export default RevenueCard;
