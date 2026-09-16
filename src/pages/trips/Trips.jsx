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

import TripCard from "../../components/trips/TripCard";

const demoTrips = [
  {
    id: 1,
    tripId: "#TR-8903",
    customerName: "Rahul Sharma",
    customerPhone: "9876543210",
    carName: "Toyota Innova Crysta",
    plate: "DL 01 AX 9921",
    pickup: "Delhi",
    drop: "Gurgaon",
    distance: 42,
    totalAmount: 1800,
    status: "Completed",
    date: "12 Sep 2026",
    time: "09:30 AM",
    paymentStatus: "Paid via UPI",
  },
  {
    id: 2,
    tripId: "#TR-8904",
    customerName: "Amit Kumar",
    customerPhone: "9988776655",
    carName: "Mahindra Scorpio N",
    plate: "DL 04 CZ 3012",
    pickup: "Noida",
    drop: "Delhi",
    distance: 38,
    totalAmount: 2200,
    status: "Active",
    date: "Today",
    time: "11:15 AM",
    paymentStatus: "Reserved",
  },
  {
    id: 3,
    tripId: "#TR-8902",
    customerName: "Neha Singh",
    customerPhone: "8899001122",
    carName: "Maruti Suzuki Ertiga",
    plate: "DL 04 CZ 3012",
    pickup: "Faridabad",
    drop: "Delhi",
    distance: 25,
    totalAmount: 1450,
    status: "Upcoming",
    date: "Tomorrow",
    time: "07:00 AM",
    paymentStatus: "Reserved",
  },
  {
    id: 4,
    tripId: "#TR-8901",
    customerName: "Priya Patel",
    customerPhone: "9812345678",
    carName: "Toyota Innova Crysta",
    plate: "DL 01 AX 9921",
    pickup: "Noida Sector 62",
    drop: "IGI Airport Terminal 3",
    distance: 38,
    totalAmount: 1450,
    status: "Completed",
    date: "10 Sep 2026",
    time: "08:45 AM",
    paymentStatus: "Paid via UPI",
  },
  {
    id: 5,
    tripId: "#TR-8900",
    customerName: "Vikram Malhotra",
    customerPhone: "9900112233",
    carName: "Toyota Fortuner",
    plate: "DL 09 BF 7001",
    pickup: "Aerocity",
    drop: "Cyber Hub",
    distance: 26,
    totalAmount: 2200,
    status: "Cancelled",
    date: "09 Sep 2026",
    time: "07:00 PM",
    paymentStatus: "Refund Pending",
  },
];

const vehicles = [
  "All Vehicles",
  "Toyota Innova Crysta",
  "Mahindra Scorpio N",
  "Maruti Suzuki Ertiga",
  "Toyota Fortuner",
];

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
  const [trips, setTrips] = useState(demoTrips);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All Vehicles");

  const completeTrip = (id) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              status: "Completed",
              paymentStatus: "Paid",
            }
          : trip
      )
    );

    toast.success("Trip completed");
  };

  const cancelTrip = (id) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              status: "Cancelled",
            }
          : trip
      )
    );

    toast.error("Trip cancelled");
  };

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        trip.customerName.toLowerCase().includes(searchValue) ||
        trip.customerPhone.includes(searchValue) ||
        trip.carName.toLowerCase().includes(searchValue) ||
        trip.plate.toLowerCase().includes(searchValue) ||
        trip.pickup.toLowerCase().includes(searchValue) ||
        trip.drop.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || trip.status === statusFilter;

      const matchesVehicle =
        vehicleFilter === "All Vehicles" ||
        trip.carName === vehicleFilter;

      return matchesSearch && matchesStatus && matchesVehicle;
    });
  }, [trips, search, statusFilter, vehicleFilter]);

  const counts = {
    All: trips.length,
    Active: trips.filter((trip) => trip.status === "Active").length,
    Upcoming: trips.filter((trip) => trip.status === "Upcoming").length,
    Completed: trips.filter((trip) => trip.status === "Completed").length,
    Cancelled: trips.filter((trip) => trip.status === "Cancelled").length,
  };

  const todayRevenue = trips
    .filter(
      (trip) =>
        trip.status === "Active" || trip.date === "Today"
    )
    .reduce((total, trip) => total + trip.totalAmount, 0);

  const totalDistance = trips.reduce(
    (total, trip) => total + Number(trip.distance || 0),
    0
  );

  const completedTrips = trips.filter(
    (trip) => trip.status === "Completed"
  ).length;

  const settlementRate =
    trips.length > 0
      ? Math.round((completedTrips / trips.length) * 100)
      : 0;

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
              className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[9px] font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Create Trip Studio
            </Link>

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
            onClick={() => toast.success("Export will be available with the reports API")}
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
            }
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
                onComplete={completeTrip}
                onCancel={cancelTrip}
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