import { Calculator, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { carService } from "../../services/carService";

function TripEstimator() {
  const [cars, setCars] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);

  const [distance, setDistance] = useState(50);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await carService.getCars();

        setCars(response.data);

        if (availableCars.length > 0) {
          setSelectedCar(availableCars[0]);
        }
      } catch (error) {
        console.error("Failed to load cars", error);
      }
    }

    fetchCars();
  }, []);

  const estimatedPrice = selectedCar ? distance * selectedCar.pricePerKm : 0;

  return (
    <div
      className="
    rounded-2xl
    border
    border-slate-200
    bg-white
    shadow-sm
    "
    >
      {/* Header */}

      <div
        className="
      flex
      items-center
      gap-3
      border-b
      border-slate-100
      px-5
      py-4
      "
      >
        <div
          className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        bg-blue-50
        text-blue-600
        "
        >
          <Calculator size={20} />
        </div>

        <div>
          <h2
            className="
          font-extrabold
          text-slate-900
          "
          >
            Instant Estimator
          </h2>

          <p
            className="
          text-xs
          text-slate-400
          "
          >
            Fast fare calculation
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* Vehicle */}

        <div>
          <label
            className="
          text-xs
          font-bold
          text-slate-500
          "
          >
            Select Vehicle
          </label>

          <select
            value={selectedCar?.id || ""}
            onChange={(e) => {
              const car = cars.find((c) => c.id === Number(e.target.value));

              setSelectedCar(car);
            }}
            className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          px-3
          text-sm
          font-semibold
          "
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ₹{car.pricePerKm}/km
              </option>
            ))}
          </select>
        </div>

        {/* Distance */}

        <div>
          <div
            className="
          flex
          justify-between
          text-sm
          font-bold
          "
          >
            <span>Distance</span>

            <span className="text-blue-600">{distance} km</span>
          </div>

          <input
            type="range"
            min="1"
            max="500"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="
          mt-3
          w-full
          accent-[#2147c6]
          "
          />
        </div>

        {/* Quote */}

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
          "
          >
            Estimated Quote
          </p>

          <h2
            className="
          mt-1
          text-3xl
          font-extrabold
          text-[#173fbe]
          "
          >
            ₹{estimatedPrice.toLocaleString("en-IN")}
          </h2>
        </div>

        <Link
          to="/trips/create"
          className="
        flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[#2147c6]
        text-sm
        font-bold
        text-white
        "
        >
          Start Booking
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default TripEstimator;
