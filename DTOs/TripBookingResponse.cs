namespace CarBookingAPI.DTOs
{
    public class TripBookingResponse
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CarBrand { get; set; } = string.Empty;
        public string CarModel { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string PickupLocation { get; set; } = string.Empty;
        public string DropLocation { get; set; } = string.Empty;
        public double TotalPrice { get; set; }
        public double DistanceInKm { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime BookingDate { get; set; }
    }
}
