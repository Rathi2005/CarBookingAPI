import { MapPin, Car } from "lucide-react";

function LiveMap() {
  return (
    <div
      className="
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
"
    >
      <div
        className="
border-b
border-slate-100
px-5
py-4
"
      >
        <h2
          className="
font-extrabold
text-slate-900
"
        >
          Live Transit Map
        </h2>

        <p
          className="
text-xs
text-slate-400
"
        >
          1 Active Vehicle
        </p>
      </div>

      <div
        className="
relative
h-[280px]
bg-slate-100
"
      >
        <div
          className="
absolute
left-1/4
top-1/3
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-red-500
text-white
"
        >
          <MapPin />
        </div>

        <div
          className="
absolute
right-1/4
top-1/2
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-blue-600
text-white
"
        >
          <Car />
        </div>
      </div>
    </div>
  );
}

export default LiveMap;
