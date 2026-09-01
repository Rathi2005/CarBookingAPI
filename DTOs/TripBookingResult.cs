using CarBookingAPI.Models;

namespace CarBookingAPI.DTOs
{
    public class TripBookingResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public TripBooking? Booking { get; set; }

        public static TripBookingResult Ok(string message, TripBooking booking)
        {
            return new TripBookingResult
            {
                Success = true,
                Message = message,
                Booking = booking
            };
        }
        public static TripBookingResult Fail(string message)
        {
            return new TripBookingResult
            {
                Success = false,
                Message = message,
                Booking = null
            };
        }
    }
}
