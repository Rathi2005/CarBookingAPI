import { Car, Edit, Trash2, Route } from "lucide-react";

import StatusBadge from "../common/StatusBadge";

function CarCard({ car, onEdit, onDelete, onViewTrips }) {
  return (
    <div
      className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
"
    >
      {/* Header */}

      <div
        className="
flex
justify-between
items-start
"
      >
        <div
          className="
flex
gap-4
items-center
"
        >
          <div
            className="
h-14
w-14
rounded-xl
bg-blue-50
text-blue-600
flex
items-center
justify-center
"
          >
            <Car size={28} />
          </div>

          <div>
            <h2
              className="
text-lg
font-extrabold
text-slate-900
"
            >
              {car.brand} {car.model}
            </h2>

            <p
              className="
text-sm
text-slate-500
mt-1
"
            >
              Year {car.year}
            </p>
          </div>
        </div>

        <StatusBadge status={car.status} />
      </div>

      {/* Metrics */}

      <div
        className="
grid
grid-cols-2
gap-4
mt-6
"
      >
        <div
          className="
rounded-xl
bg-slate-50
p-4
"
        >
          <p
            className="
text-xs
text-slate-400
font-bold
"
          >
            PRICE / KM
          </p>

          <p
            className="
text-2xl
font-extrabold
mt-1
"
          >
            ₹{car.pricePerKm}
          </p>
        </div>

        <div
          className="
rounded-xl
bg-slate-50
p-4
"
        >
          <p
            className="
text-xs
text-slate-400
font-bold
"
          >
            TOTAL TRIPS
          </p>

          <p
            className="
text-2xl
font-extrabold
mt-1
"
          >
            {car.tripBookings?.length || 0}
          </p>
        </div>
      </div>

      {/* Earnings */}

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
          MONTHLY EARNINGS
        </p>

        <p
          className="
text-xl
font-extrabold
text-slate-900
"
        >
          ₹86,400
        </p>
      </div>

      {/* Actions */}

      <div
        className="
flex
gap-3
mt-6
"
      >
        <button
          onClick={() => onEdit(car.id)}
          className="
flex-1
h-11
rounded-xl
border
border-slate-200
flex
items-center
justify-center
gap-2
text-sm
font-bold
text-slate-700
hover:bg-slate-50
"
        >
          <Edit size={16} />
          Edit
        </button>

        <button
          className="
flex-1
h-11
rounded-xl
border
border-blue-100
bg-blue-50
text-blue-700
flex
items-center
justify-center
gap-2
text-sm
font-bold
"
          onClick={() => onViewTrips(car.id)}
        >
          <Route size={16} />
          Trips
        </button>

        <button
          onClick={() => onDelete(car.id)}
          className="
h-11
w-11
rounded-xl
bg-red-50
text-red-600
flex
items-center
justify-center
"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

export default CarCard;
