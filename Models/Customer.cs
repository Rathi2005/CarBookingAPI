namespace CarBookingAPI.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public List<TripBooking> TripBookings { get; set; } = new List<TripBooking>();

        public Customer()
        {

        }
        public Customer(int id, string name, string phoneNumber, string email)
        {
            Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
