using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripBookingsController : ControllerBase
    {
        private readonly ITripBookingService tripBookingService;
        private readonly IOwnerService ownerService;
        private readonly ICarService carService;
        private readonly ICustomerService customerService;

        public TripBookingsController(
            ITripBookingService tripBookingService,
            IOwnerService ownerService,
            ICarService carService,
            ICustomerService customerService)
        {
            this.tripBookingService = tripBookingService;
            this.ownerService = ownerService;
            this.carService = carService;
            this.customerService = customerService;
        }

        [Authorize(Roles = "Owner")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<TripBookingResponse>> GetAllBookings()
        {
            List<TripBookingResponse> bookings = tripBookingService.GetAllBookingResponses();

            ApiResponse<List<TripBookingResponse>> response = new ApiResponse<List<TripBookingResponse>>
            {
                Success = true,
                Message = "Bookings fetched successfully.",
                Data = bookings
            };

            return Ok(response);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<TripBookingResponse> GetBookingById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid booking ID.");
            }

            TripBookingResponse? booking = tripBookingService.GetBookingResponseById(id);

            if (booking is null)
            {
                return NotFound("Booking not found.");
            }

            ApiResponse<TripBookingResponse> response = new ApiResponse<TripBookingResponse>
            {
                Success = true,
                Message = "Booking fetched successfully.",
                Data = booking
            };

            return Ok(response);
        }

        [Authorize(Roles = "Owner")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<TripBookingResult> CreateBooking([FromBody] CreateTripBookingRequest request)
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            TripBookingResult result = tripBookingService.CreateBooking(ownerId, request);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        [Authorize(Roles = "Owner")]
        [HttpPut("{id:int}/cancel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<TripBookingResult> CancelBooking([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid booking ID.");
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            TripBookingResult result = tripBookingService.CancelBooking(id, ownerId);

            if (!result.Success)
            {
                if (result.Message == "Booking not found.")
                {
                    return NotFound(result.Message);
                }

                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        [Authorize(Roles = "Owner")]
        [HttpPut("{id:int}/complete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<TripBookingResult> CompleteBooking([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid booking ID.");
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            TripBookingResult result = tripBookingService.CompleteBooking(id, ownerId);

            if (!result.Success)
            {
                if (result.Message == "Booking not found.")
                {
                    return NotFound(result.Message);
                }

                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("customer/{customerId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<TripBookingResponse>> GetBookingsByCustomerId([FromRoute] int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid customer ID.");
            }

            Customer? customer = customerService.GetCustomerById(customerId);

            if (customer is null)
            {
                return NotFound("Customer not found.");
            }

            List<TripBookingResponse> bookings = tripBookingService.GetBookingsByCustomerId(customerId);

            return Ok(bookings);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("car/{carId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<TripBookingResponse>> GetBookingsByCarId([FromRoute] int carId)
        {
            if (carId <= 0)
            {
                return BadRequest("Invalid car ID.");
            }

            Car? car = carService.GetCarById(carId);

            if (car is null)
            {
                return NotFound("Car not found.");
            }

            List<TripBookingResponse> bookings = tripBookingService.GetBookingsByCarId(carId);

            return Ok(bookings);
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("owner/{ownerId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<TripBooking>> GetOwnerTrips([FromRoute] int ownerId)
        {
            if (ownerId <= 0)
            {
                return BadRequest();
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int loggedInOwnerId))
            {
                return Unauthorized("Invalid token.");
            }

            if (ownerId != loggedInOwnerId)
            {
                return BadRequest("You can only access your own trips.");
            }

            Owner? owner = ownerService.GetOwnerById(ownerId);

            if (owner is null)
            {
                return NotFound("Owner not found");
            }

            return Ok(tripBookingService.GetOwnersBooking(ownerId));
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("me/dashboard")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<OwnerDashboardResponse> GetMyDashboard()
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            OwnerDashboardResponse dashboard = tripBookingService.GetDashboardByOwnerId(ownerId);

            return Ok(dashboard);
        }

    }

}
