import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";

import CarCard from "../cars/CarCard";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";


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


    useEffect(() => {
        // Temporary demo data.
        // API integration will replace this later.
        setLoading(false);
    }, []);


    function handleSearch(value) {
        setSearch(value);

        const searchValue = value.toLowerCase().trim();

        if (!searchValue) {
            setFilteredCars(cars);
            return;
        }

        const result = cars.filter((car) =>
            `${car.brand} ${car.model} ${car.year}`
                .toLowerCase()
                .includes(searchValue)
        );

        setFilteredCars(result);
    }


    function handleDelete(id) {
        const car = cars.find((item) => item.id === id);

        const confirmed = window.confirm(
            `Are you sure you want to delete ${car?.brand} ${car?.model}?`
        );

        if (!confirmed) {
            return;
        }

        const updatedCars = cars.filter(
            (item) => item.id !== id
        );

        setCars(updatedCars);
        setFilteredCars(updatedCars);
    }


    function handleEdit(id) {
        navigate(`/cars/edit/${id}`);
    }


    if (loading) {
        return <LoadingSpinner />;
    }


    return (
        <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
                mb-8
            ">

                <div>
                    <h1 className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-slate-900
                    ">
                        My Cars
                    </h1>

                    <p className="
                        text-sm
                        sm:text-base
                        text-slate-500
                        mt-1
                    ">
                        Manage your vehicles and availability
                    </p>
                </div>


                <Link
                    to="/cars/add"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        active:bg-blue-800
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-medium
                        transition
                        shadow-sm
                        w-full
                        sm:w-auto
                    "
                >
                    <Plus size={20} />

                    Add Car
                </Link>

            </div>


            {/* Search */}
            <div className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-4
                mb-6
                shadow-sm
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                ">

                    <Search
                        size={20}
                        className="text-slate-400 shrink-0"
                    />


                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                        placeholder="Search by brand, model or year..."
                        className="
                            w-full
                            bg-transparent
                            outline-none
                            text-sm
                            text-slate-800
                            placeholder:text-slate-400
                        "
                    />

                </div>

            </div>


            {/* Results Count */}
            <div className="mb-4">

                <p className="
                    text-sm
                    text-slate-500
                ">
                    {filteredCars.length}{" "}
                    {filteredCars.length === 1 ? "car" : "cars"} found
                </p>

            </div>


            {/* Cars */}
            {filteredCars.length === 0 ? (

                <EmptyState
                    message={
                        search
                            ? "No cars match your search."
                            : "You haven't added any cars yet."
                    }
                />

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                ">

                    {filteredCars.map((car) => (

                        <CarCard
                            key={car.id}
                            car={car}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}


export default Cars;