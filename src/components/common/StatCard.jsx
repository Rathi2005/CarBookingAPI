import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon: Icon, color = "blue" }) {
  return (
    <div
      className="
bg-white
rounded-xl
shadow-sm
p-6
border
hover:shadow-md
transition
"
    >
      <div
        className="
flex
justify-between
items-start
"
      >
        <div>
          <p
            className="
text-gray-500
text-sm
"
          >
            {title}
          </p>

          <h2
            className="
text-3xl
font-bold
mt-2
"
          >
            {value}
          </h2>
        </div>

        <div
          className="
p-3
rounded-xl
bg-blue-100
text-blue-600
"
        >
          <Icon size={24} />
        </div>
      </div>

      <div
        className="
flex
items-center
gap-1
text-sm
text-gray-400
mt-4
"
      >
        <ArrowUpRight size={16} />
        Updated today
      </div>
    </div>
  );
}

export default StatCard;
