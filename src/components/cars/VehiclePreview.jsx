import { Car, IndianRupee, CalendarDays } from "lucide-react";

const placeholderImage =
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=700&q=80";

function VehiclePreview({ formData }) {
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
mb-4
"
      >
        Vehicle Preview
      </h2>

      <img
        src={placeholderImage}
        alt="vehicle"
        className="
h-44
w-full
rounded-2xl
object-cover
"
      />

      <div className="mt-5 flex items-center gap-3">
        <div
          className="
h-11
w-11
rounded-xl
bg-blue-50
text-blue-600
flex
items-center
justify-center
"
        >
          <Car size={22} />
        </div>

        <div>
          <h3
            className="
text-lg
font-extrabold
text-slate-900
"
          >
            {formData.brand || "Toyota"} {formData.model || "Innova Crysta"}
          </h3>

          <p
            className="
text-sm
text-slate-500
"
          >
            Vehicle Details
          </p>
        </div>
      </div>

      <div
        className="
mt-5
grid
grid-cols-2
gap-3
"
      >
        <div
          className="
rounded-xl
bg-slate-50
p-4
"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <CalendarDays size={15} />

            <span className="text-xs font-bold">YEAR</span>
          </div>

          <p
            className="
mt-2
text-xl
font-extrabold
"
          >
            {formData.year || "2025"}
          </p>
        </div>

        <div
          className="
rounded-xl
bg-slate-50
p-4
"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <IndianRupee size={15} />

            <span className="text-xs font-bold">PER KM</span>
          </div>

          <p
            className="
mt-2
text-xl
font-extrabold
"
          >
            ₹{formData.pricePerKm || "18"}
          </p>
        </div>
      </div>

      <div
        className="
mt-4
rounded-xl
bg-emerald-50
p-4
"
      >
        <p
          className="
text-xs
font-bold
text-emerald-700
"
        >
          STATUS
        </p>

        <p
          className="
mt-1
font-extrabold
text-emerald-800
"
        >
          Available
        </p>
      </div>
    </div>
  );
}

export default VehiclePreview;
