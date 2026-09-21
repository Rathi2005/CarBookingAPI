import { useMemo, useState } from "react";
import {
  Search,
  Car,
  CalendarDays,
  Download,
  Plus,
  Activity,
  IndianRupee,
  Route,
  CircleCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTrips } from "../../hooks/useTrips";
import tripService from "../../services/tripService";
import TripCard from "../../components/trips/TripCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function StatCard({ icon: Icon, label, value, helper, iconClass }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[8px] text-slate-400">{helper}</p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={15} />
        </div>
      </div>
    </div>
  );
}

function Trips() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All Vehicles");
  const [processingTrip, setProcessingTrip] = useState({
    id: null,
    action: null,
  });
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { data, isLoading, isError, refetch } = useTrips();

  const apiTrips = data || [];

  async function handleCompleteTrip(id) {
    try {
      setProcessingTrip({
        id,
        action: "complete",
      });

      await tripService.completeTrip(id);

      toast.success("Trip completed successfully");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to complete trip");
    } finally {
      setProcessingTrip({
        id: null,
        action: null,
      });
    }
  }

  async function handleCancelTrip(id) {
    try {
      setProcessingTrip({
        id,
        action: "cancel",
      });

      await tripService.cancelTrip(id);

      toast.success("Trip cancelled successfully");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to cancel trip");
    } finally {
      setProcessingTrip({
        id: null,
        action: null,
      });
    }
  }

  const trips = apiTrips.map((trip) => ({
    id: trip.id,

    tripId: `#TR-${trip.id}`,

    customerName: trip.customerName || "Walk-in Customer",

    customerPhone: "",

    carName: `${trip.carBrand} ${trip.carModel}`,

    pickup: trip.pickupLocation,

    drop: trip.dropLocation,

    distance: trip.distanceInKm,

    totalAmount: trip.totalPrice,

    status: trip.status,

    date: new Date(trip.bookingDate).toLocaleDateString(),

    time: new Date(trip.bookingDate).toLocaleTimeString(),

    paymentStatus: "Pending",
  }));

  const vehicles = [
    "All Vehicles",
    ...new Set(trips.map((trip) => trip.carName)),
  ];

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        (trip.customerName || "").toLowerCase().includes(searchValue) ||
        (trip.carName || "").toLowerCase().includes(searchValue) ||
        (trip.pickup || "").toLowerCase().includes(searchValue) ||
        (trip.drop || "").toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || trip.status === statusFilter;

      const matchesVehicle =
        vehicleFilter === "All Vehicles" || trip.carName === vehicleFilter;

      return matchesSearch && matchesStatus && matchesVehicle;
    });
  }, [trips, search, statusFilter, vehicleFilter]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Failed to load trips</p>;
  }

  const counts = {
    All: trips.length,
    Active: trips.filter((trip) => trip.status === "Active").length,
    Upcoming: trips.filter((trip) => trip.status === "Upcoming").length,
    Completed: trips.filter((trip) => trip.status === "Completed").length,
    Cancelled: trips.filter((trip) => trip.status === "Cancelled").length,
  };

  const todayRevenue = trips
    .filter((trip) => trip.status === "Active")
    .reduce((total, trip) => total + Number(trip.totalAmount || 0), 0);

  const totalDistance = trips
    .filter((trip) => trip.status !== "Cancelled")
    .reduce((total, trip) => total + Number(trip.distance || 0), 0);

  const completedTrips = trips.filter(
    (trip) => trip.status === "Completed",
  ).length;

  const settlementRate =
    trips.length > 0 ? Math.round((completedTrips / trips.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2147c6]">
                Fleet Operations
              </span>

              <span className="text-[8px] text-slate-300">•</span>

              <span className="text-[8px] font-semibold text-slate-400">
                Transit Command
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Trips
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and track customer journeys, route calculations, and fare
              settlements
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[9px] font-bold text-slate-600 shadow-sm hover:bg-slate-50">
              Trips Directory
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px]">
                {trips.length}
              </span>
            </button>

            <Link
              to="/trips/create"
              className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-[#2147c6] px-3.5 text-[9px] font-bold text-white shadow-sm transition hover:bg-[#193dad]"
            >
              <Plus size={13} />
              Create Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard
          icon={Activity}
          label="Live Runs"
          value={String(counts.Active).padStart(2, "0")}
          helper={`${counts.Active} active on route`}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          icon={IndianRupee}
          label="Today's Revenue"
          value={`₹${todayRevenue.toLocaleString("en-IN")}`}
          helper={`${counts.Active + counts.Upcoming} bookings scheduled`}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          icon={Route}
          label="Total Distance"
          value={`${totalDistance} km`}
          helper="Across current trip directory"
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          icon={CircleCheck}
          label="Settlement Rate"
          value={`${settlementRate}%`}
          helper="Completed trips / total trips"
          iconClass="bg-violet-50 text-violet-600"
        />
      </section>

      {/* Filters */}
      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="flex flex-col gap-2 lg:flex-row">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer name, phone, car or plate..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[9px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
            />
          </div>

          {/* Vehicle */}
          <div className="relative">
            <Car
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              className="h-11 w-full min-w-[170px] appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-7 text-[9px] font-semibold text-slate-600 outline-none focus:border-blue-400 lg:w-auto"
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle}>{vehicle}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[9px] font-semibold text-slate-600">
            <CalendarDays size={13} />
            This Month (Sep 2026)
          </button>

          {/* Export */}
          <button
            onClick={() =>
              toast.success("Export will be available with the reports API")
            }
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[9px] font-bold text-slate-600 hover:bg-slate-50"
          >
            <Download size={13} />
            Export
          </button>
        </div>

        {/* Status filters */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5">
          {["All", "Active", "Upcoming", "Completed", "Cancelled"].map(
            (status) => {
              const active = statusFilter === status;

              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[8px] font-bold transition ${
                    active
                      ? "bg-[#173fbe] text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {status} ({counts[status]})
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* Directory */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-[11px] font-extrabold text-slate-800">
              Trip Directory
            </h2>

            <p className="text-[8px] text-slate-400">
              Showing {filteredTrips.length} of {trips.length} entries
            </p>
          </div>

          <span className="hidden text-[8px] font-semibold text-slate-400 sm:block">
            Updated just now
          </span>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
              <Search size={17} />
            </div>

            <h3 className="mt-3 text-[12px] font-bold text-slate-700">
              No trips found
            </h3>

            <p className="mt-1 text-[9px] text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onComplete={handleCompleteTrip}
                onCancel={handleCancelTrip}
                loading={processingTrip}
              />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <p className="text-[8px] text-slate-400">
          Showing 1–{filteredTrips.length} of {trips.length} entries
        </p>

        <div className="flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
            <ChevronLeft size={13} />
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-md bg-[#173fbe] text-[8px] font-bold text-white">
            1
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-[8px] font-bold text-slate-500 hover:bg-slate-50">
            2
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-[8px] font-bold text-slate-500 hover:bg-slate-50">
            3
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
            <ChevronRight size={13} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Trips;
