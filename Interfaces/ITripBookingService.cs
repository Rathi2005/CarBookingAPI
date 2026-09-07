using CarBookingAPI.DTOs;
using CarBookingAPI.Models;

namespace CarBookingAPI.Interfaces
{
    public interface ITripBookingService
    {
        public List<TripBooking> GetAllBookings();
        public TripBooking GetBookingById(int id);
        public List<TripBookingResponse> GetAllBookingResponses();
        public TripBookingResponse? GetBookingResponseById(int id);
        public TripBookingResult CreateBooking(CreateTripBookingRequest request);
        public TripBookingResult CancelBooking(int id);
        public TripBookingResult CompleteBooking(int id);
        public List<TripBookingResponse> GetBookingsByCustomerId(int customerId);
        public List<TripBookingResponse> GetBookingsByCarId(int carId);
        public List<TripBookingResponse> GetOwnersBooking(int ownerId);
        OwnerDailyReportResponse GetDailyReportByOwnerId(int ownerId, DateTime date);
        OwnerMonthlyReportResponse GetMonthlyReportByOwnerId(int ownerId, int year, int month);

    }
}
