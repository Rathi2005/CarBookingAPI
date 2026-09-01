using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs
{
    public class CreateOwnerRequest
    {
        [Required(ErrorMessage ="Name canot be empty")]
        [StringLength(50, MinimumLength =2, ErrorMessage = "Name length should be between 2 to 50 letters")]
        public string Name { get; set; } = string.Empty;        // this string.Empty gives the string a default value to prevent
                                                                // Null refrence exception.
        [Required(ErrorMessage ="Phone number is mandatory")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must contain exactly 10 digits and no letters")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage ="Email cannot be empty")]
        [EmailAddress(ErrorMessage ="Invalid Email Address")]
        public string Email { get; set; } = string.Empty;
    }
}
