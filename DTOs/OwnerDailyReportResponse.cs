namespace CarBookingAPI.DTOs
{
    public class OwnerDailyReportResponse
    {
        public int OwnerId { get; set; }
        public DateTime Date { get; set; }
        public int TotalTrips { get; set; }
        public int CompletedTrips { get; set; }
        public int CancelledTrips { get; set; }
        public double TotalEarnings { get; set; }
        public List<TripBookingResponse> Trips { get; set; } = new List<TripBookingResponse>();
    }
}
