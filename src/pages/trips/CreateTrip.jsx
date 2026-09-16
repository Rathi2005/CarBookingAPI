import { useState } from "react";

import TripForm from "../../components/trips/TripForm";

import PricePreview from "../../components/trips/PricePreview";

import { toast } from "react-hot-toast";

const demoCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Innova Crysta",
    pricePerKm: 18,
  },

  {
    id: 2,
    brand: "Mahindra",
    model: "Scorpio N",
    pricePerKm: 20,
  },

  {
    id: 3,
    brand: "Maruti",
    model: "Ertiga",
    pricePerKm: 15,
  },
];

const CreateTrip = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",

    customerPhone: "",

    carId: "",

    pickup: "",

    drop: "",

    distance: "",
  });

  const selectedCar = demoCars.find((car) => car.id === Number(formData.carId));

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      console.log(formData);

      toast.success("Trip created successfully");

      setLoading(false);
    }, 1000);
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
          cars={demoCars}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateTrip;
