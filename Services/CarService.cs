using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

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
            return context.Cars
                .Include(car => car.Owner)
                .ToList();
        }

        public Car? GetCarById(int id)
        {
            return context.Cars
                .Include(car => car.Owner)
                .FirstOrDefault(car => car.Id == id);
        }

        public List<Car> GetAvailableCars()
        {
            return context.Cars
                .Where(car => car.IsAvailable)
                .Include(car => car.Owner)
                .ToList();
        }

        public List<Car> GetCarsByOwnerId(int ownerId)
        {
            return context.Cars
                .Where(car => car.OwnerId == ownerId)
                .Include(car => car.Owner)
                .ToList();
        }

        public Car AddCar(int ownerId, CreateCarRequest request)
        {
            Car car = new Car
            {
                OwnerId = ownerId,
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

        public Car? UpdateCar(int id, int ownerId, UpdateCarRequest request)
        {
            Car? car = context.Cars
                .FirstOrDefault(car => car.Id == id && car.OwnerId == ownerId);

            if (car is null)
            {
                return null;
            }

            car.Brand = request.Brand;
            car.Model = request.Model;
            car.Year = request.Year;
            car.PricePerKm = request.PricePerKm;

            context.SaveChanges();

            return car;
        }

        public bool DeleteCar(int id, int ownerId)
        {
            Car? car = context.Cars
                .FirstOrDefault(car => car.Id == id && car.OwnerId == ownerId);

            if (car is null)
            {
                return false;
            }

            bool hasTrip = context.TripBookings.Any(t => t.CarId == id);
            if (hasTrip)
            {
                return false;
            }

            context.Cars.Remove(car);
            context.SaveChanges();

            return true;
        }

        public bool SetCarAvailability(int carId, bool isAvailable)
        {
            Car? car = context.Cars.FirstOrDefault(car => car.Id == carId);

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
