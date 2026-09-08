namespace CarBookingAPI.DTOs
{
    public class OwnerDashboardResponse
    {
        public int OwnerId { get; set; }
        public int TotalCars { get; set; }
        public int AvailableCars { get; set; }
        public int TotalTrips { get; set; }
        public int ActiveTrips { get; set; }
        public int CompletedTrips { get; set; }
        public int CancelledTrips { get; set; }
        public double TotalEarnings { get; set; }
    }
}
