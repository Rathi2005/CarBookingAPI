import { useEffect, useState } from "react";

import { carService } from "../../services/carService";
import tripService from "../../services/tripService";

import { useNavigate } from "react-router-dom";

import TripForm from "../../components/trips/TripForm";

import PricePreview from "../../components/trips/PricePreview";

import { toast } from "react-hot-toast";

const CreateTrip = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState([]);

  const [carsLoading, setCarsLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: "",

    customerPhone: "",

    carId: "",

    pickup: "",

    drop: "",

    distance: "",
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        setCarsLoading(true);

        const response = await carService.getCars();

        setCars(response.data);
      } catch (error) {
        console.error("Failed to load cars", error);

        toast.error("Unable to load vehicles");
      } finally {
        setCarsLoading(false);
      }
    }

    fetchCars();
  }, []);

  const selectedCar = cars.find((car) => car.id === Number(formData.carId));
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.carId ||
      !formData.pickup ||
      !formData.drop ||
      !formData.distance
    ) {
      toast.error("Please fill required fields");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        carId: Number(formData.carId),

        pickupLocation: formData.pickup,

        dropLocation: formData.drop,

        distanceInKm: Number(formData.distance),
      };

      console.log("Creating trip:", payload);

      await tripService.createTrip(payload);

      toast.success("Trip created successfully");

      navigate("/trips");
    } catch (error) {
      console.error("Trip creation failed", error);

      toast.error(error.response?.data?.message || "Unable to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
max-w-3xl
mx-auto
space-y-6
"
    >
      <div>
        <h1
          className="
text-2xl
font-bold
"
        >
          Create Trip
        </h1>

        <p className="text-gray-500">Add a new customer trip</p>
      </div>

      <PricePreview
        distance={formData.distance}
        pricePerKm={selectedCar?.pricePerKm || 0}
      />

      <div
        className="
bg-white
rounded-2xl
border
shadow-sm
p-5
"
      >
        <TripForm
          formData={formData}
          cars={cars}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateTrip;
