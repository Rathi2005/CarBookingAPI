namespace CarBookingAPI.Models
{
    public class TripBooking
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CarId { get; set; }
        public string PickupLocation { get; set; }
        public string DropLocation { get; set; }
        public decimal DistanceInKm { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }

        public TripBooking()
        {

        }
        public TripBooking(
            int id,
            int customerId,
            int carId,
            string pickupLocation,
            string dropLocation,
            decimal distanceInKm,
            decimal totalPrice)
        {
            Id = id;
            CustomerId = customerId;
            CarId = carId;
            PickupLocation = pickupLocation;
            DropLocation = dropLocation;
            DistanceInKm = distanceInKm;
            TotalPrice = totalPrice;
            BookingDate = DateTime.Now;
            Status = TripBookingStatus.Active;
        }
    }
}
