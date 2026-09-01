using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public Owner()
        {
            // why this constructor?
            // EF Core works best when entity classes have an empty constructor.
        }
        public Owner(int id, string name, string phoneNumber, string email)
        {
            Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
