using CarBookingAPI.DTOs;
using CarBookingAPI.Models;

namespace CarBookingAPI.Interfaces
{
    public interface ICarService
    {
        List<Car> GetAllCars();
        Car? GetCarById(int id);
        List<Car> GetAvailableCars();
        List<Car> GetCarsByOwnerId(int ownerId);
        Car AddCar(CreateCarRequest request);
        Car? UpdateCar(int id, UpdateCarRequest request);
        bool DeleteCar(int id);
        bool SetCarAvailability(int carId, bool isAvailable);
    }
}
