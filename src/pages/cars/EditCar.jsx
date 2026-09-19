import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CarForm from "../../components/cars/CarForm";
import VehiclePreview from "../../components/cars/VehiclePreview";
import { carService } from "../../services/carService";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function EditCar() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerKm: "",
  });

  const [loading, setLoading] = useState(false);
  async function fetchCar() {
    try {
      setLoading(true);

      const response = await carService.getCarById(id);

      const car = response.data;

      setFormData({
        brand: car.brand,

        model: car.model,

        year: car.year,

        pricePerKm: car.pricePerKm,
      });
    } catch (error) {
      console.error("Failed to fetch car", error);

      toast.error("Unable to load vehicle");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await carService.updateCar(id, formData);

      toast.success("Vehicle updated successfully");

      navigate("/cars");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update vehicle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
        <p
          className="
text-xs
font-bold
uppercase
tracking-wide
text-blue-600
"
        >
          Fleet Management
        </p>

        <h1
          className="
mt-2
text-3xl
font-extrabold
text-slate-950
"
        >
          Edit Vehicle
        </h1>

        <p
          className="
mt-2
text-sm
text-slate-500
"
        >
          Update vehicle details and maintain accurate fleet records.
        </p>
      </section>

      <div
        className="
grid
gap-6
lg:grid-cols-[1fr_380px]
"
      >
        {/* Form */}

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
          <h2
            className="
mb-5
text-xl
font-extrabold
"
          >
            Vehicle Information
          </h2>

          <CarForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/cars")}
          />
        </section>

        {/* Preview */}

        <VehiclePreview formData={formData} />
      </div>
    </div>
  );
}

export default EditCar;
