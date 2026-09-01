using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;

namespace CarBookingAPI.Services
{
    public class CarService : ICarService
    {
        private readonly AppDbContext context;

        public CarService(AppDbContext context)
        {
            this.context = context;
        }

        public List<Car> GetAllCars()
        {
            return context.Cars.ToList();
        }

        public Car? GetCarById(int id)
        {
            return context.Cars.FirstOrDefault(car => car.Id == id);
        }

        public Car AddCar(CreateCarRequest request)
        {
            Car car = new Car
            {
                OwnerId = request.OwnerId,
                Brand = request.Brand,
                Model = request.Model,
                Year = request.Year,
                PricePerKm = request.PricePerKm,
                IsAvailable = true
            };

            context.Cars.Add(car);
            context.SaveChanges();

            return car;
        }

        public Car? UpdateCar(int id, UpdateCarRequest request)
        {
            Car? car = GetCarById(id);

            if (car is null)
            {
                return null;
            }

            car.OwnerId = request.OwnerId;
            car.Brand = request.Brand;
            car.Model = request.Model;
            car.Year = request.Year;
            car.PricePerKm = request.PricePerKm;

            context.SaveChanges();

            return car;
        }

        public bool DeleteCar(int id)
        {
            Car? car = GetCarById(id);

            if (car is null)
            {
                return false;
            }

            context.Cars.Remove(car);
            context.SaveChanges();

            return true;
        }

        public List<Car> GetAvailableCars()
        {
            return context.Cars
                .Where(car => car.IsAvailable)
                .ToList();
        }

        public List<Car> GetCarsByOwnerId(int ownerId)
        {
            return context.Cars
                .Where(car => car.OwnerId == ownerId)
                .ToList();
        }

        public bool SetCarAvailability(int carId, bool isAvailable)
        {
            Car? car = GetCarById(carId);

            if (car is null)
            {
                return false;
            }

            car.IsAvailable = isAvailable;
            context.SaveChanges();

            return true;
        }
    }
}
