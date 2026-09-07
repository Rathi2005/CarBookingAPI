using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs
{
    public class UpdateCarRequest
    {

        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Brand must be between 2 and 50 characters.")]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Model is required.")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Model must be between 1 and 50 characters.")]
        public string Model { get; set; } = string.Empty;

        [Range(1990, 2100, ErrorMessage = "Year must be between 1990 and 2100.")]
        public int Year { get; set; }

        [Range(1, 10000, ErrorMessage = "Price per km must be between 1 and 10000.")]
        public double PricePerKm { get; set; }

    }
}
