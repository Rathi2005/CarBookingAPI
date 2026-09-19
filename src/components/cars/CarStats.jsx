import { Car, CheckCircle2, Activity, IndianRupee } from "lucide-react";

function CarStats({ cars = [] }) {
  const totalCars = cars?.length || 0;

  const availableCars = (cars || []).filter((car) => car.isAvailable).length;

  const unavailableCars = (cars || []).filter((car) => !car.isAvailable).length;

  const totalRevenue = cars.reduce((sum, car) => {
    return (
      sum +
      (car.tripBookings?.reduce(
        (tripSum, trip) => tripSum + (trip.amount || 0),
        0,
      ) || 0)
    );
  }, 0);

  const stats = [
    {
      title: "Total Cars",
      value: totalCars,
      desc: "Registered vehicles",
      icon: Car,
      color: "bg-blue-50 text-blue-600",
    },

    {
      title: "Available",
      value: availableCars,
      desc: "Ready for trips",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },

    {
      title: "On Trip",
      value: unavailableCars,
      desc: "Currently running",
      icon: Activity,
      color: "bg-indigo-50 text-indigo-600",
    },

    {
      title: "Revenue",
      value: totalRevenue > 0 ? `₹${totalRevenue}` : "₹0",
      desc: "This month",
      icon: IndianRupee,
      color: "bg-violet-50 text-violet-600",
    },
  ];

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
