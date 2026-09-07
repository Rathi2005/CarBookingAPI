using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs
{
    public class CreateTripBookingRequest
    {
        [Range(1, int.MaxValue, ErrorMessage = "Customer ID must be greater than 0.")]
        public int CustomerId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Car ID must be greater than 0.")]
        public int CarId { get; set; }

        [Required(ErrorMessage = "Pickup location is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Pickup location must be between 2 and 100 characters.")]
        public string PickupLocation { get; set; } = string.Empty;

        [Required(ErrorMessage = "Drop location is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Drop location must be between 2 and 100 characters.")]
        public string DropLocation { get; set; } = string.Empty;

        [Range(1, 10000, ErrorMessage = "Distance must be between 1 and 10000 km.")]
        public double DistanceInKm { get; set; }
    }
}
