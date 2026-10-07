using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs
{
    public class UpdateCarRequest
    {
        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(
            50,
            MinimumLength = 2,
            ErrorMessage = "Brand must be between 2 and 50 characters."
        )]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Model is required.")]
        [StringLength(
            50,
            MinimumLength = 1,
            ErrorMessage = "Model must be between 1 and 50 characters."
        )]
        public string Model { get; set; } = string.Empty;

        [Range(
            1990,
            2100,
            ErrorMessage = "Year must be between 1990 and 2100."
        )]
        public int Year { get; set; }

        [Range(
            1,
            10000,
            ErrorMessage = "Price per km must be between 1 and 10000."
        )]
        public double PricePerKm { get; set; }

        [Required(ErrorMessage = "Number plate is required.")]
        [StringLength(
            20,
            MinimumLength = 4,
            ErrorMessage = "Number plate must be between 4 and 20 characters."
        )]
        public string NumberPlate { get; set; } = string.Empty;

        [Url(ErrorMessage = "Please provide a valid image URL.")]
        public string? ImageUrl { get; set; }

        [StringLength(
            100,
            ErrorMessage = "Driver name cannot exceed 100 characters."
        )]
        public string? DriverName { get; set; }

        [Phone(ErrorMessage = "Please provide a valid driver phone number.")]
        [StringLength(
            20,
            ErrorMessage = "Driver phone number cannot exceed 20 characters."
        )]
        public string? DriverPhoneNumber { get; set; }
    }
}
