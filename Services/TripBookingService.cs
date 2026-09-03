using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using CarBookingAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace CarBookingAPI.Services
{
    public class TripBookingService : ITripBookingService
    {
        private readonly ICarService carService;
        private readonly ICustomerService customerService;

        private readonly AppDbContext context;

        public TripBookingService(ICarService carService, ICustomerService customerService, AppDbContext context)
        {
            this.carService = carService;
            this.customerService = customerService;
            this.context = context;
        }

        public List<TripBooking> GetAllBookings()
        {
            return context.TripBookings.Include(booking => booking.Customer).Include(booking => booking.Car).ToList();
        }

        public TripBooking? GetBookingById(int id)
        {
            return context.TripBookings.Include(booking => booking.Customer).Include(booking => booking.Car).FirstOrDefault(booking => booking.Id == id);
        }

        public TripBookingResult CreateBooking(CreateTripBookingRequest request)
        {
            Customer? customer = customerService.GetCustomerById(request.CustomerId);

            if (customer is null)
            {
                return TripBookingResult.Fail("Customer not found.");
            }

            Car? car = carService.GetCarById(request.CarId);

            if (car is null)
            {
                return TripBookingResult.Fail("Car not found.");
            }

            if (!car.IsAvailable)
            {
                return TripBookingResult.Fail("Car is not available.");
            }

            if (request.DistanceInKm <= 0)
            {
                return TripBookingResult.Fail("Distance must be greater than 0.");
            }

            decimal totalPrice = request.DistanceInKm * car.PricePerKm;

            TripBooking booking = new TripBooking
            {
                CustomerId = request.CustomerId,
                CarId = request.CarId,
                PickupLocation = request.PickupLocation,
                DropLocation = request.DropLocation,
                DistanceInKm = request.DistanceInKm,
                TotalPrice = totalPrice,
                BookingDate = DateTime.Now,
                Status = TripBookingStatus.Active
            };

            context.TripBookings.Add(booking);

            car.IsAvailable = false;

            context.SaveChanges();

            return TripBookingResult.Ok("Booking created successfully.", booking);
        }

        public TripBookingResult CancelBooking(int id)
        {
            TripBooking? booking = GetBookingById(id);

            if (booking is null)
            {
                return TripBookingResult.Fail("Booking not found");
            }

            if (booking.Status != TripBookingStatus.Active)
            {
                return TripBookingResult.Fail("Booking Already Closed");
            }

            booking.Status = TripBookingStatus.Cancelled;

            carService.SetCarAvailability(booking.CarId, true);
            context.SaveChanges();
            return TripBookingResult.Ok("Booking successfully Cancelled", booking);
        }

        public TripBookingResult CompleteBooking(int id)
        {
            TripBooking? booking = GetBookingById(id);

            if (booking is null)
            {
                return TripBookingResult.Fail("Booking not found");
            }

            if (booking.Status != TripBookingStatus.Active)
            {
                return TripBookingResult.Fail("Only active bookings can be completed.");
            }

            booking.Status = TripBookingStatus.Completed;

            carService.SetCarAvailability(booking.CarId, true);
            context.SaveChanges();
            return TripBookingResult.Ok("Booking completed successfully.", booking);
        }


        // Customers Trip History
        public List<TripBooking> GetBookingsByCustomerId(int customerId)
        {
            return context.TripBookings
                .Where(booking => booking.CustomerId == customerId)
                .ToList();
        }

        // Trips Histroy Per Car
        public List<TripBooking> GetBookingsByCarId(int carId)
        {
            return context.TripBookings
                .Where(booking => booking.CarId == carId)
                .ToList();
        }

        // Owners Trip History
        public List<TripBooking> GetOwnersBooking(int ownerId) {
            List<Car> ownerCars = carService.GetCarsByOwnerId(ownerId);

            List<int> carIds = ownerCars.Select(c => c.Id).ToList();

            List<TripBooking> ownerBookings = context.TripBookings.Where(trip => carIds.Contains(trip.CarId)).ToList();

            return ownerBookings;
        }

    }
}
