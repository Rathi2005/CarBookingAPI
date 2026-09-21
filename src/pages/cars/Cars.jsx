import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCars } from "../../hooks/useCars";
import { carService } from "../../services/carService";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, SlidersHorizontal } from "lucide-react";

import CarCard from "../../components/cars/CarCard";
import CarStats from "../../components/cars/CarStats";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

function Cars() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const { data: cars = [], isLoading, isError } = useCars();

  const filteredCars = search.trim()
    ? cars.filter((car) => {
        const text = `${car.brand} ${car.model} ${car.year}`.toLowerCase();

        return text.includes(search.toLowerCase());
      })
    : cars;

  const deleteCarMutation = useMutation({
    mutationFn: (id) => carService.deleteCar(id),

    onSuccess: () => {
      toast.success(
        `${selectedCar.brand} ${selectedCar.model} deleted successfully`,
      );

      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      setSelectedCar(null);
      setShowDeleteModal(false);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Unable to delete car");
    },
  });

  function handleViewTrips(carId) {
    navigate(`/cars/${carId}/trips`);
  }

  function handleSearch(value) {
    setSearch(value);
  }

  function openDeleteModal(car) {
    setSelectedCar(car);

    setShowDeleteModal(true);
  }

  function handleEdit(id) {
    navigate(`/cars/edit/${id}`);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Unable to load cars</p>
      </div>
    );
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

      <CarStats cars={cars} />

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
              car={{
                ...car,

                status: car.isAvailable ? "Available" : "Unavailable",
              }}
              onEdit={handleEdit}
              onDelete={() => openDeleteModal(car)}
              onViewTrips={handleViewTrips}
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
        loading={deleting}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedCar(null);
        }}
        onConfirm={() => deleteCarMutation.mutate(selectedCar.id)}
      />
    </div>
  );
}

export default Cars;
