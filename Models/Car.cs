namespace CarBookingAPI.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public decimal PricePerKm { get; set; }
        public bool IsAvailable { get; set; }
        public int OwnerId { get; set; }

        public Car()
        {

        }
        public Car(int id, int ownerId, string brand, string model, int year, decimal pricePerKm)
        {
            Id = id;
            OwnerId = ownerId;
            Brand = brand;
            Model = model;
            Year = year;
            PricePerKm = pricePerKm;
            IsAvailable = true;
        }
    }
}
