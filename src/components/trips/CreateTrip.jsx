import { useState } from "react";

import TripForm from "../../components/trips/TripForm";
import PricePreview from "../../components/trips/PricePreview";

function CreateTrip() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    carId: "",
    pickup: "",
    drop: "",
    distance: "",
  });

  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Innova Crysta",
      pricePerKm: 18,
    },
    {
      id: 2,
      brand: "Scorpio",
      model: "Scorpio N",
      pricePerKm: 22,
    },
  ];

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <section>
        <h1 className="text-3xl font-extrabold">Create Trip</h1>

        <p className="text-slate-500">Add a new customer journey</p>
      </section>

      <div
        className="
grid
gap-6
lg:grid-cols-[1fr_360px]
"
      >
        <section
          className="
bg-white
rounded-2xl
border
p-6
"
        >
          <TripForm
            formData={formData}
            cars={cars}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>

        <div className="space-y-6">
          <PricePreview
            distance={formData.distance}
            pricePerKm={cars.find((c) => c.id == formData.carId)?.pricePerKm}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
