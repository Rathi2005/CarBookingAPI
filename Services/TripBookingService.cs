using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
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

        private TripBookingResponse MapToResponse(TripBooking booking)
        {
            return new TripBookingResponse
            {
                Id = booking.Id,
                CustomerName = booking.Customer?.Name ?? string.Empty,
                CarBrand = booking.Car?.Brand ?? string.Empty,
                CarModel = booking.Car?.Model ?? string.Empty,
                OwnerName = booking.Car?.Owner?.Name ?? string.Empty,
                PickupLocation = booking.PickupLocation,
                DropLocation = booking.DropLocation,
                TotalPrice = booking.TotalPrice,
                DistanceInKm = booking.DistanceInKm,
                Status = booking.Status,
                BookingDate = booking.BookingDate
            };
        }

        public List<TripBooking> GetAllBookings()
        {
            return context.TripBookings
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .ToList();
        }

        public List<TripBookingResponse> GetAllBookingResponses()
        {
            List<TripBooking> bookings = context.TripBookings
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .ToList();

            return bookings.Select(MapToResponse).ToList();
        }

        public TripBookingResponse? GetBookingResponseById(int id)
        {
            TripBooking? trip = context.TripBookings
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .FirstOrDefault(booking => booking.Id == id);

            if (trip is null)
            {
                return null;
            }

            return MapToResponse(trip);
        }

        public TripBooking? GetBookingById(int id)
        {
            return context.TripBookings
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .FirstOrDefault(booking => booking.Id == id);
        }


        public TripBookingResult CreateBooking(int ownerId, CreateTripBookingRequest request)
        {
            //Customer? customer = context.Customers.FirstOrDefault(c => c.Id == request.CustomerId);
            //if (customer is null)
            //{
            //    return TripBookingResult.Fail("Customer not found.");
            //}

            if (request.CustomerId.HasValue)
            {
                Customer? customer = context.Customers.FirstOrDefault(c => c.Id == request.CustomerId.Value);

                if (customer is null)
                {
                    return TripBookingResult.Fail("Customer not found.");
                }
            }

            Car? car = context.Cars.FirstOrDefault(c => c.Id == request.CarId);
            if (car is null)
            {
                return TripBookingResult.Fail("Car not found.");
            }

            if (car.OwnerId != ownerId)
            {
                return TripBookingResult.Fail("You can create bookings only for your own cars.");
            }

            if (!car.IsAvailable)
            {
                return TripBookingResult.Fail("Car is not available.");
            }

            if (request.DistanceInKm <= 0)
            {
                return TripBookingResult.Fail("Distance must be greater than zero.");
            }

            TripBooking booking = new TripBooking
            {
                CustomerId = request.CustomerId,
                CarId = request.CarId,
                PickupLocation = request.PickupLocation,
                DropLocation = request.DropLocation,
                DistanceInKm = request.DistanceInKm,
                TotalPrice = request.DistanceInKm * car.PricePerKm,
                BookingDate = DateTime.Now,
                Status = TripBookingStatus.Active
            };

            context.TripBookings.Add(booking);
            car.IsAvailable = false;
            context.SaveChanges();

            context.Entry(booking).Reference(b => b.Customer).Load();
            context.Entry(booking).Reference(b => b.Car).Load();
            context.Entry(booking).Reference(b => b.Car!).Query().Include(c => c.Owner).Load();

            return TripBookingResult.Ok("Booking created successfully.", booking);
        }

        public TripBookingResult CancelBooking(int id, int ownerId)
        {
            TripBooking? booking = GetBookingById(id);

            if (booking is null)
            {
                return TripBookingResult.Fail("Booking not found.");
            }

            if (booking.Car is null || booking.Car.OwnerId != ownerId)
            {
                return TripBookingResult.Fail("Booking not found.");
            }

            if (booking.Status != TripBookingStatus.Active)
            {
                return TripBookingResult.Fail("Only active bookings can be cancelled.");
            }

            booking.Status = TripBookingStatus.Cancelled;
            booking.Car.IsAvailable = true;

            context.SaveChanges();

            return TripBookingResult.Ok("Booking successfully cancelled.", booking);
        }

        public TripBookingResult CompleteBooking(int id, int ownerId)
        {
            TripBooking? booking = GetBookingById(id);

            if (booking is null)
            {
                return TripBookingResult.Fail("Booking not found.");
            }

            if (booking.Car is null || booking.Car.OwnerId != ownerId)
            {
                return TripBookingResult.Fail("Booking not found.");
            }

            if (booking.Status != TripBookingStatus.Active)
            {
                return TripBookingResult.Fail("Only active bookings can be completed.");
            }

            booking.Status = TripBookingStatus.Completed;
            booking.Car.IsAvailable = true;

            context.SaveChanges();

            return TripBookingResult.Ok("Booking completed successfully.", booking);
        }

        public List<TripBookingResponse> GetBookingsByCustomerId(int customerId)
        {
            List<TripBooking> bookings = context.TripBookings
                .Where(booking => booking.CustomerId == customerId)
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .ToList();

            return bookings.Select(MapToResponse).ToList();
        }

        public List<TripBookingResponse> GetBookingsByCarId(int carId)
        {
            List<TripBooking> bookings = context.TripBookings
                .Where(booking => booking.CarId == carId)
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .ToList();

            return bookings.Select(MapToResponse).ToList();
        }

        public List<TripBookingResponse> GetOwnersBooking(int ownerId)
        {
            List<Car> ownerCars = carService.GetCarsByOwnerId(ownerId);
            List<int> carIds = ownerCars.Select(c => c.Id).ToList();

            List<TripBooking> ownerBookings = context.TripBookings
                .Where(trip => carIds.Contains(trip.CarId))
                .Include(booking => booking.Customer)
                .Include(booking => booking.Car)
                .ThenInclude(car => car.Owner)
                .ToList();

            return ownerBookings.Select(MapToResponse).ToList();
        }

        public OwnerDailyReportResponse GetDailyReportByOwnerId(int ownerId, DateTime date)
        {
            List<TripBookingResponse> trips = GetOwnersBooking(ownerId)
                .Where(trip => trip.BookingDate.Date == date.Date)
                .ToList();

            return new OwnerDailyReportResponse
            {
                OwnerId = ownerId,
                Date = date.Date,
                TotalTrips = trips.Count,
                CompletedTrips = trips.Count(trip => trip.Status == TripBookingStatus.Completed),
                CancelledTrips = trips.Count(trip => trip.Status == TripBookingStatus.Cancelled),
                TotalEarnings = (double)trips
                    .Where(trip => trip.Status == TripBookingStatus.Completed)
                    .Sum(trip => trip.TotalPrice),
                Trips = trips
            };
        }

        public OwnerMonthlyReportResponse GetMonthlyReportByOwnerId(int ownerId, int year, int month)
        {
            List<TripBookingResponse> trips = GetOwnersBooking(ownerId)
                .Where(trip => trip.BookingDate.Year == year && trip.BookingDate.Month == month)
                .ToList();

            return new OwnerMonthlyReportResponse
            {
                OwnerId = ownerId,
                Year = year,
                Month = month,
                TotalTrips = trips.Count,
                CompletedTrips = trips.Count(trip => trip.Status == TripBookingStatus.Completed),
                CancelledTrips = trips.Count(trip => trip.Status == TripBookingStatus.Cancelled),
                TotalEarnings = (double)trips
                    .Where(trip => trip.Status == TripBookingStatus.Completed)
                    .Sum(trip => trip.TotalPrice),
                Trips = trips
            };
        }

        public OwnerDashboardResponse GetDashboardByOwnerId(int ownerId)
        {
            List<Car> ownerCars = carService.GetCarsByOwnerId(ownerId);
            List<TripBookingResponse> trips = GetOwnersBooking(ownerId);

            return new OwnerDashboardResponse
            {
                OwnerId = ownerId,
                TotalCars = ownerCars.Count,
                AvailableCars = ownerCars.Count(car => car.IsAvailable),
                TotalTrips = trips.Count,
                ActiveTrips = trips.Count(trip => trip.Status == TripBookingStatus.Active),
                CompletedTrips = trips.Count(trip => trip.Status == TripBookingStatus.Completed),
                CancelledTrips = trips.Count(trip => trip.Status == TripBookingStatus.Cancelled),
                TotalEarnings = (double)trips
                    .Where(trip => trip.Status == TripBookingStatus.Completed)
                    .Sum(trip => trip.TotalPrice)
            };
        }

    }
}
