import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Car, CheckCircle2, IndianRupee, Route } from "lucide-react";

import tripService from "../../services/tripService";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import TripCard from "../../components/trips/TripCard";

function CarTrips() {
  const { carId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["carTrips", carId],

    queryFn: () => tripService.getTripsByCarId(carId),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Unable to load vehicle trips</p>
      </div>
    );
  }

  const trips = Array.isArray(data) ? data : (data?.data ?? []);
  const vehicleName =
    trips.length > 0 ? `${trips[0].carBrand} ${trips[0].carModel}` : "Vehicle";
  const totalTrips = trips.length;

  const completedTrips = trips.filter(
    (trip) => trip.status === "Completed",
  ).length;

  const totalRevenue = trips
    .filter((trip) => trip.status !== "Cancelled")
    .reduce((sum, trip) => sum + Number(trip.totalPrice || 0), 0);

  const totalDistance = trips
    .filter((trip) => trip.status !== "Cancelled")
    .reduce((sum, trip) => sum + Number(trip.distanceInKm || 0), 0);
  console.log("CAR TRIPS DATA:", trips);
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}

      <section
        className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      "
      >
        <Link
          to="/cars"
          className="
        inline-flex
        items-center
        gap-2
        text-sm
        font-bold
        text-blue-600
        mb-4
        "
        >
          <ArrowLeft size={16} />
          Back to Cars
        </Link>

        <div className="flex items-center gap-4">
          <div
            className="
          h-14
          w-14
          rounded-2xl
          bg-blue-50
          flex
          items-center
          justify-center
          text-blue-600
          "
          >
            <Car size={28} />
          </div>

          <div>
            <p
              className="
            text-xs
            uppercase
            font-bold
            text-blue-600
            "
            >
              Vehicle Analytics
            </p>

            <h1
              className="
  mt-1
  text-3xl
  font-extrabold
  text-slate-950
  "
            >
              {vehicleName}
            </h1>

            <p
              className="
  text-sm
  text-slate-500
  mt-1
  "
            >
              Complete trip history and performance overview
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}

      <div
        className="
      grid
      gap-4
      sm:grid-cols-2
      xl:grid-cols-4
      "
      >
        <StatCard icon={<Route />} title="Total Trips" value={totalTrips} />

        <StatCard
          icon={<CheckCircle2 />}
          title="Completed"
          value={completedTrips}
        />

        <StatCard
          icon={<IndianRupee />}
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
        />

        <StatCard
          icon={<Car />}
          title="Distance"
          value={`${totalDistance} km`}
        />
      </div>

      {/* Trips */}

      <section
        className="
      space-y-5
      "
      >
        <h2
          className="
        text-xl
        font-extrabold
        text-slate-900
        "
        >
          Trip History
        </h2>

        {trips.length === 0 ? (
          <div
            className="
            rounded-2xl
            bg-white
            border
            p-10
            text-center
            "
          >
            <p
              className="
              font-bold
              text-slate-700
              "
            >
              No trips found
            </p>

            <p
              className="
              text-sm
              text-slate-400
              mt-1
              "
            >
              This vehicle has no trips yet.
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            gap-5
            "
          >
            {trips.map((trip) => {
              const formattedTrip = {
                id: trip.id,

                tripId: `TR-${trip.id}`,

                customerName: trip.customerName || "Walk-in Customer",

                customerPhone: trip.customerPhone || "N/A",

                carName: `${trip.carBrand} ${trip.carModel}`,

                pickup: trip.pickupLocation,

                drop: trip.dropLocation,

                distance: trip.distanceInKm,

                totalAmount: trip.totalPrice,

                status: trip.status,

                plate: "N/A",

                date: new Date(trip.bookingDate).toLocaleDateString(),

                time: new Date(trip.bookingDate).toLocaleTimeString(),

                paymentStatus: "Paid",
              };

              return (
                <TripCard
                  key={formattedTrip.id}
                  trip={formattedTrip}
                  onComplete={(id) => console.log("complete", id)}
                  onCancel={(id) => console.log("cancel", id)}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ icon, title, value }) {
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
      <div
        className="
flex
justify-between
items-center
"
      >
        <div>
          <p
            className="
text-xs
uppercase
font-bold
text-slate-400
"
          >
            {title}
          </p>

          <h2
            className="
mt-2
text-2xl
font-extrabold
text-slate-900
"
          >
            {value}
          </h2>
        </div>

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
          {icon}
        </div>
      </div>
    </div>
  );
}

export default CarTrips;
