namespace CarBookingAPI.DTOs
{
    public class OwnerMonthlyReportResponse
    {
        public int OwnerId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int TotalTrips { get; set; }
        public int CompletedTrips { get; set; }
        public int CancelledTrips { get; set; }
        public double TotalEarnings { get; set; }
        public List<TripBookingResponse> Trips { get; set; } = new List<TripBookingResponse>();
    }
}
