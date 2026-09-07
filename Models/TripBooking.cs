namespace CarBookingAPI.Models
{
    public class TripBooking
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CarId { get; set; }
        public string PickupLocation { get; set; }
        public string DropLocation { get; set; }
        public double DistanceInKm { get; set; }
        public double TotalPrice { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }

        // these below fields tells that the tripbooking has a car and a customer 
        // we will define the relationship in the AppDbContext file.
        public Customer Customer { get; set; } = null!;
        public Car Car { get; set; } = null!;

        public TripBooking()
        {

        }
        public TripBooking(
            int id,
            int customerId,
            int carId,
            string pickupLocation,
            string dropLocation,
            double distanceInKm,
            double totalPrice)
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
