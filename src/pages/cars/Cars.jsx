import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, SlidersHorizontal } from "lucide-react";

import CarCard from "../../components/cars/CarCard";
import CarStats from "../../components/cars/CarStats";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

const demoCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Innova Crysta",
    year: 2024,
    pricePerKm: 18,
    status: "Available",
  },

  {
    id: 2,
    brand: "Mahindra",
    model: "Scorpio N",
    year: 2023,
    pricePerKm: 22,
    status: "Unavailable",
  },

  {
    id: 3,
    brand: "Maruti",
    model: "Ertiga",
    year: 2025,
    pricePerKm: 15,
    status: "Available",
  },
];

function Cars() {
  const navigate = useNavigate();

  const [cars, setCars] = useState(demoCars);

  const [filteredCars, setFilteredCars] = useState(demoCars);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [selectedCar, setSelectedCar] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  function handleSearch(value) {
    setSearch(value);

    if (!value.trim()) {
      setFilteredCars(cars);

      return;
    }

    const result = cars.filter((car) => {
      const text = `${car.brand} ${car.model} ${car.year}`.toLowerCase();

      return text.includes(value.toLowerCase());
    });

    setFilteredCars(result);
  }

  function openDeleteModal(car) {
    setSelectedCar(car);

    setShowDeleteModal(true);
  }

  function deleteCar() {
    const updatedCars = cars.filter((car) => car.id !== selectedCar.id);

    setCars(updatedCars);

    setFilteredCars(updatedCars);

    setSelectedCar(null);

    setShowDeleteModal(false);
  }

  function handleEdit(id) {
    navigate(`/cars/edit/${id}`);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

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
        <div
          className="
flex
flex-col
gap-5
lg:flex-row
lg:items-center
lg:justify-between
"
        >
          <div>
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
tracking-tight
text-slate-950
"
            >
              My Cars
            </h1>

            <p
              className="
mt-2
text-sm
text-slate-500
"
            >
              Manage your vehicles, availability and performance.
            </p>
          </div>

          <Link
            to="/cars/add"
            className="
h-11
px-5
rounded-xl
bg-[#2147c6]
text-white
flex
items-center
justify-center
gap-2
font-bold
text-sm
hover:bg-[#193dad]
transition
"
          >
            <Plus size={18} />
            Add New Car
          </Link>
        </div>
      </section>

      {/* Stats */}

      <CarStats />

      {/* Filters */}

      <section
        className="
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
"
      >
        <div
          className="
flex
flex-col
gap-3
lg:flex-row
"
        >
          <div
            className="
relative
flex-1
"
          >
            <Search
              size={18}
              className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
            />

            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search vehicle by brand, model or year..."
              className="
h-11
w-full
rounded-xl
border
border-slate-200
bg-slate-50
pl-11
pr-4
text-sm
outline-none
focus:border-blue-500
focus:bg-white
"
            ></input>
          </div>

          <button
            className="
h-11
rounded-xl
border
border-slate-200
bg-white
px-5
flex
items-center
justify-center
gap-2
text-sm
font-bold
text-slate-600
"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        <div
          className="
mt-4
flex
items-center
justify-between
"
        >
          <p
            className="
text-sm
text-slate-500
"
          >
            Showing
            <span className="font-bold text-slate-700">
              {" "}
              {filteredCars.length}
            </span>{" "}
            vehicles
          </p>

          <span
            className="
text-xs
text-slate-400
"
          >
            Updated recently
          </span>
        </div>
      </section>

      {/* Cars Grid */}

      {filteredCars.length === 0 ? (
        <EmptyState
          message="
No cars found. Add your first vehicle.
"
        />
      ) : (
        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={handleEdit}
              onDelete={() => openDeleteModal(car)}
            />
          ))}
        </div>
      )}

      {/* Delete Modal */}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Vehicle?"
        message={`Are you sure you want to delete ${selectedCar?.brand} ${selectedCar?.model}?`}
        confirmText="Delete"
        onCancel={() => {
          setShowDeleteModal(false);

          setSelectedCar(null);
        }}
        onConfirm={deleteCar}
      />
    </div>
  );
}

export default Cars;
