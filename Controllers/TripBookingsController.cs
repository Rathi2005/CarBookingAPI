using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using CarBookingAPI.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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

        public TripBookingsController(ITripBookingService tripBookingService, IOwnerService ownerService, ICarService carService, ICustomerService customerService)
        {
            this.tripBookingService = tripBookingService;
            this.ownerService = ownerService;
            this.carService = carService;
            this.customerService = customerService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
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

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TripBookingResult> CreateBooking([FromBody] CreateTripBookingRequest request)
        {
            TripBookingResult result = tripBookingService.CreateBooking(request);

            if (!result.Success)
                return BadRequest(result.Message);

            return CreatedAtAction(nameof(GetBookingById), new { id = result.Booking!.Id }, result);
        }

        [HttpPut("{id:int}/cancel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TripBookingResult> CancelBooking([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid booking ID.");
            }

            TripBookingResult result = tripBookingService.CancelBooking(id);

            if (!result.Success)
            {
                if (result.Message == "Booking not found")
                {
                    return NotFound(result.Message);
                }

                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        [HttpPut("{id:int}/complete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TripBookingResult> CompleteBooking([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid booking ID.");
            }

            TripBookingResult result = tripBookingService.CompleteBooking(id);

            if (!result.Success)
            {
                if (result.Message == "Booking not found")
                {
                    return NotFound(result.Message);
                }

                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        [HttpGet("customer/{customerId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

        [HttpGet("car/{carId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

        [HttpGet("owner/{ownerId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<TripBooking>> GetOwnerTrips([FromRoute] int ownerId)
        {
            if (ownerId <= 0)
            {
                return BadRequest();
            }

            Owner? o = ownerService.GetOwnerById(ownerId);
            if(o is null)
            {
                return NotFound("Owner not found");
            }

            return Ok(tripBookingService.GetOwnersBooking(ownerId));
        }
    }
}
