import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CarForm from "../../components/cars/CarForm";
import VehiclePreview from "../../components/cars/VehiclePreview";

import { carService } from "../../services/carService";

function AddCar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerKm: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    setSuccess("");

    if (
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.pricePerKm
    ) {
      setError("Please fill all required fields");

      return;
    }

    try {
      setLoading(true);

      await carService.createCar(formData);

      setSuccess("Vehicle added successfully");

      setTimeout(() => {
        navigate("/cars");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
        <p className="text-xs font-bold uppercase text-blue-600">
          Fleet Management
        </p>

        <h1 className="mt-2 text-3xl font-extrabold">
          Vehicle Registration Studio
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Register your vehicle and prepare it for trip operations.
        </p>
      </section>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <div
        className="
grid
gap-6
lg:grid-cols-[1fr_380px]
"
      >
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
          <h2 className="mb-5 text-xl font-extrabold">Vehicle Information</h2>

          <CarForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/cars")}
          />
        </section>

        <VehiclePreview formData={formData} />
      </div>
    </div>
  );
}

export default AddCar;
