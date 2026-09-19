import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function RecentTrips({ trips =[] }) {
  const tripList = Array.isArray(trips)
    ? trips
    : trips?.data ?? [];

  function getInitials(name) {
    if (!name) return "WC";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  function getStatusStyle(status) {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700";

      case "active":
        return "bg-blue-50 text-blue-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      case "pending":
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-lg font-extrabold text-slate-900">
          Recent Trips
        </h2>

        <Link
          to="/trips"
          className="flex items-center gap-1 text-sm font-bold text-[#2147c6]"
        >
          View All
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Trips */}
      <div className="divide-y divide-slate-100">
        {tripList.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="font-semibold text-slate-700">
              No trips found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Your recent bookings will appear here.
            </p>
          </div>
        ) : (
          tripList.map((trip) => {
            const customerName =
              trip.customerName?.trim() || "Walk-in Customer";

            const carName = [trip.carBrand, trip.carModel]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={trip.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                {/* Left */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                    {getInitials(customerName)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">
                      {customerName}
                    </p>

                    <p className="truncate text-sm text-slate-500">
                      {carName || "Vehicle unavailable"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {trip.pickupLocation || "—"} →{" "}
                      {trip.dropLocation || "—"}{" "}
                      • {trip.distanceInKm ?? 0} km
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="shrink-0 text-right">
                  <p className="text-lg font-extrabold text-slate-900">
                    ₹{Number(trip.totalPrice || 0).toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                      trip.status
                    )}`}
                  >
                    {trip.status || "Unknown"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RecentTrips;