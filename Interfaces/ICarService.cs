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

        Car AddCar(int ownerId, CreateCarRequest request);
        Car? UpdateCar(int id, int ownerId, UpdateCarRequest request);
        bool DeleteCar(int id, int ownerId);

        bool SetCarAvailability(int carId, bool isAvailable);
    }
}
