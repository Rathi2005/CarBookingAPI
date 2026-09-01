using Microsoft.Extensions.FileSystemGlobbing;
using System.ComponentModel.DataAnnotations;

namespace CarBookingAPI.DTOs  // these act as a templete for the user form also called DTO (Data transfer object).
                                // talks directly to the user (bridge between the API and the user).
                                // It is different from a model.
{
    public class CreateCarRequest
    {
        [Range(1, int.MaxValue, ErrorMessage = "Owner ID must be greater than 0.")]
        public int OwnerId { get; set; }

        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Brand must be between 2 and 50 characters.")]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Model is required.")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Model must be between 1 and 50 characters.")]
        public string Model { get; set; } = string.Empty;

        [Range(1990, 2100, ErrorMessage = "Year must be between 1990 and 2100.")]
        public int Year { get; set; }

        [Range(1, 10000, ErrorMessage = "Price per km must be between 1 and 10000.")]
        public decimal PricePerKm { get; set; }
    }
}

//  [USER FORM] 
//        │  (Sends JSON data over the internet)
//        ▼
//  [CONTROLLER] ──► Catches data using 'CreateCarRequest'(DTO) and here the ASP.net matches the name with the DTO and maps the values
//        │          in the DTO now the controller will have values in the DTO
//        │  (Passes the DTO down)
//        ▼
//  [SERVICE] ──► Extracts DTO data->Creates an official 'Car' (Model) -> Saves it
//        │
//        │  (Returns the saved Model back up)
//        ▼
//  [CONTROLLER] ──► Packs the Model into Ok() and sends it back to the User's screen
