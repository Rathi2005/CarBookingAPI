using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs
{
    public class CreateCustomerRequest
    {
        [Required(ErrorMessage ="Name is Required")] // Data Annotations
        [StringLength(50, MinimumLength =2, ErrorMessage ="Name must be between 2 and 50 letters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must contain exactly 10 digits and no letters")]
        public string PhoneNumber { get; set; }= string.Empty;
        [Required]
        [EmailAddress(ErrorMessage ="Invalid Email Address")]
        public string Email { get; set; } = string.Empty;
    }

    // [ApiController] automatically checks the DTO validation before your action method runs.
}
