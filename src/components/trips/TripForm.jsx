import { User, Phone, Car, MapPin, Navigation, Route } from "lucide-react";

import InputField from "../common/InputField";

const TripForm = ({ formData, cars, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Customer Details */}

      <section>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
            h-9
            w-9
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >
            1
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Customer Details
            </h2>

            <p className="text-sm text-slate-500">Enter customer information</p>
          </div>
        </div>

        <div
          className="
          grid
          gap-5
          md:grid-cols-2
          "
        >
          <InputField
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            placeholder="Enter customer name"
          />

          <InputField
            label="Phone Number"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={onChange}
            placeholder="Enter phone number"
          />
        </div>
      </section>

      {/* Vehicle Selection */}

      <section>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
            h-9
            w-9
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >
            2
          </div>

          <div>
            <h2 className="text-xl font-extrabold">Vehicle Selection</h2>

            <p className="text-sm text-slate-500">
              Choose the vehicle for this trip
            </p>
          </div>
        </div>

        <div className="relative">
          <Car
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          />

          <select
            name="carId"
            value={formData.carId}
            onChange={onChange}
            className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-200
            bg-white
            pl-11
            pr-4
            text-sm
            outline-none
            focus:border-blue-500
            "
          >
            <option value="">Select Vehicle</option>

            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} - ₹{car.pricePerKm}/km
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Trip Details */}

      <section>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
            h-9
            w-9
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >
            3
          </div>

          <div>
            <h2 className="text-xl font-extrabold">Trip Details</h2>

            <p className="text-sm text-slate-500">Enter journey information</p>
          </div>
        </div>

        <div className="space-y-5">
          <InputField
            label="Pickup Location"
            name="pickup"
            value={formData.pickup}
            onChange={onChange}
            placeholder="Enter pickup location"
          />

          <InputField
            label="Drop Location"
            name="drop"
            value={formData.drop}
            onChange={onChange}
            placeholder="Enter drop location"
          />

          <InputField
            label="Distance (KM)"
            name="distance"
            type="number"
            value={formData.distance}
            onChange={onChange}
            placeholder="Enter total distance"
          />
        </div>
      </section>

      {/* Submit Button */}

      <button
        disabled={loading}
        className="
        w-full
        h-12
        rounded-xl
        bg-[#2147c6]
        text-white
        font-bold
        hover:bg-[#193dad]
        transition
        disabled:opacity-50
        "
      >
        {loading ? "Creating Trip..." : "Create Trip"}
      </button>
    </form>
  );
};

export default TripForm;
