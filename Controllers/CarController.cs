using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService carService;
        private readonly ITripBookingService tripBookingService;

        public CarsController(ICarService carService, ITripBookingService tripBookingService)
        {
            this.carService = carService;
            this.tripBookingService = tripBookingService;
        }

        [Authorize(Roles = "Owner")]
        [HttpGet("me")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Car>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<Car>> GetMyCars()
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            List<Car> cars = carService.GetCarsByOwnerId(ownerId);
            return Ok(cars);
        }

        //[HttpGet("{id:int}")]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public ActionResult<Car> GetCarById([FromRoute] int id)
        //{
        //    if (id <= 0)
        //    {
        //        return BadRequest("Invalid car id.");
        //    }

        //    Car? car = carService.GetCarById(id);

        //    if (car is null)
        //    {
        //        return NotFound("Car not found.");
        //    }

        //    return Ok(car);
        //}

        [Authorize(Roles = "Owner")]
        [HttpGet("me/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Car> GetMyCarById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid car id.");
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            List<Car> cars = carService.GetCarsByOwnerId(ownerId);
            Car? car = cars.FirstOrDefault(c => c.Id == id);

            if (car is null)
            {
                return NotFound("Car not found.");
            }

            return Ok(car);
        }

        [Authorize(Roles = "Owner")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Car))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<Car> AddCar([FromBody] CreateCarRequest request)
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            Car car = carService.AddCar(ownerId, request);

            return CreatedAtAction(nameof(GetMyCarById), new { id = car.Id }, car);
        }

        [Authorize(Roles = "Owner")]
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Car> UpdateCar([FromRoute] int id, [FromBody] UpdateCarRequest request)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid car id.");
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            Car? updated = carService.UpdateCar(id, ownerId, request);

            if (updated is null)
            {
                return NotFound("Car not found.");
            }

            return Ok(updated);
        }

        [Authorize(Roles = "Owner")]
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteCar([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid car id.");
            }

            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            List<TripBookingResponse> trips = tripBookingService.GetBookingsByCarId(id);
            if (trips.Any())
            {
                return BadRequest("Cars having trips cannot be deleted.");
            }

            bool deleted = carService.DeleteCar(id, ownerId);


            if (!deleted)
            {
                return NotFound("Car not found.");
            }

            return Ok("Car deleted successfully.");
        }
    
        //[HttpGet("available")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ActionResult<List<Car>> GetAvailableCars()
        //{
        //    List<Car> availableCars = carService.GetAvailableCars();
        //    return Ok(availableCars);
        //}

        [Authorize(Roles = "Owner")]
        [HttpGet("me/available")]
        public ActionResult<List<Car>> GetMyAvailableCars()
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            List<Car> cars = carService.GetAvailableCarsByOwnerId(ownerId);

            return Ok(cars);
        }

    }
}
