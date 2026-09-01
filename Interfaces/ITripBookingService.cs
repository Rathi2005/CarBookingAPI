using CarBookingAPI.DTOs;
using CarBookingAPI.Models;

namespace CarBookingAPI.Interfaces
{
    public interface ITripBookingService
    {
        public List<TripBooking> GetAllBookings();
        public TripBooking GetBookingById(int id);
        public TripBookingResult CreateBooking(CreateTripBookingRequest request);
        public TripBookingResult CancelBooking(int id);
        public TripBookingResult CompleteBooking(int id);
        public List<TripBooking> GetBookingsByCustomerId(int customerId);
        public List<TripBooking> GetBookingsByCarId(int carId);
        public List<TripBooking> GetOwnersBooking(int ownerId);
    }
}
