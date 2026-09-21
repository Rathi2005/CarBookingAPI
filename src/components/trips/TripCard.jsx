import {
  Car,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  X,
  Clock3,
  Eye,
  Send,
} from "lucide-react";

import TripStatusBadge from "./TripStatusBadge";

const TripCard = ({
  trip = {},
  onComplete = () => {},
  onCancel = () => {},
  loading = {},
}) => {
  const status = trip.status?.toLowerCase();

  const isActive = status === "active";
  const isUpcoming = status === "upcoming";
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";

  const isCompleting =
    loading?.id === trip.id && loading?.action === "complete";

  const isCancelling = loading?.id === trip.id && loading?.action === "cancel";

  return (
    <article
      className={`
      overflow-hidden rounded-2xl border bg-white
      shadow-sm transition hover:shadow-md
      ${
        isActive
          ? "border-l-4 border-l-blue-600 border-slate-200"
          : isUpcoming
            ? "border-l-4 border-l-indigo-400 border-slate-200"
            : isCompleted
              ? "border-l-4 border-l-emerald-500 border-slate-200"
              : "border-l-4 border-l-red-400 border-slate-200"
      }
      `}
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Car size={20} className="text-slate-500" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {trip.tripId}
                </h3>

                <TripStatusBadge status={trip.status} />
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {trip.customerName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {trip.customerPhone}
                {" • "}
                {trip.carName}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {isActive
                ? "Live Fare"
                : isUpcoming
                  ? "Reserved Rate"
                  : "Settled Amount"}
            </p>

            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              ₹{trip.totalAmount.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-slate-400">{trip.distance} km</p>
          </div>
        </div>

        {/* Route */}

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-slate-400" />

              <span className="text-sm font-semibold text-slate-700">
                {trip.pickup}
              </span>
            </div>

            <div className="hidden items-center gap-2 text-slate-300 sm:flex">
              <span className="h-px w-16 bg-slate-300" />

              <ArrowRight size={16} />

              <span className="h-px w-16 bg-slate-300" />
            </div>

            <div className="flex flex-1 items-center gap-3 sm:justify-end">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />

              <span className="text-sm font-semibold text-slate-700">
                {trip.drop}
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}

        <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Car size={13} />
            {trip.plate}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {trip.distance} km
          </span>

          <span className="flex items-center gap-1">
            <Clock3 size={13} />
            {trip.date} {trip.time}
          </span>

          <span className="font-semibold text-slate-500">
            {trip.paymentStatus}
          </span>
        </div>

        {/* Actions */}

        <div
          className="
          mt-5
          flex flex-col gap-3
          border-t border-slate-100 pt-4
          sm:flex-row sm:justify-end
        "
        >
          {isActive && (
            <>
              <button
                className="
                flex h-10 items-center justify-center gap-2
                rounded-xl border border-slate-200
                px-5 text-xs font-bold text-slate-700
                hover:bg-slate-50
                "
              >
                <Phone size={14} />
                Call Customer
              </button>

              <button
                onClick={() => onComplete(trip.id)}
                disabled={isCompleting || isCancelling}
                className="
  flex h-10 min-w-[110px]
  items-center justify-center gap-2
  rounded-xl bg-emerald-600
  px-5 text-xs font-bold text-white
  "
              >
                {isCompleting ? "Completing..." : "Complete"}
              </button>

              <button
                onClick={() => onCancel(trip.id)}
                disabled={isCompleting || isCancelling}
                className="
  flex h-10 min-w-[90px]
  items-center justify-center
  rounded-xl bg-red-50
  px-4 text-xs font-bold text-red-500
  "
              >
                {isCancelling ? "Cancelling..." : "Cancel"}
              </button>
            </>
          )}

          {isUpcoming && (
            <>
              <button
                className="
              flex h-10 items-center justify-center gap-2
              rounded-xl border border-slate-200
              px-5 text-xs font-bold text-slate-700
              "
              >
                <Send size={14} />
                Send Reminder
              </button>

              <button
                className="
              flex h-10 items-center justify-center gap-2
              rounded-xl border border-slate-200
              px-5 text-xs font-bold text-slate-700
              "
              >
                <Eye size={14} />
                View Details
              </button>
            </>
          )}

          {(isCompleted || isCancelled) && (
            <button
              className="
            flex h-10 items-center justify-center gap-2
            rounded-xl border border-slate-200
            px-5 text-xs font-bold text-slate-700
            "
            >
              <Eye size={14} />
              View Details
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default TripCard;
