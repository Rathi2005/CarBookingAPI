using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using CarBookingAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService carService;
        private readonly IOwnerService ownerService;
        private readonly ITripBookingService tripBookingService;

        public CarController(ICarService carService, IOwnerService ownerService, ITripBookingService tripBookingService) // This constructor is used to Dependency Injection.
        {
            this.carService = carService;
            this.ownerService = ownerService;
            this.tripBookingService = tripBookingService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]  // this is used for documenting the api status code and their types
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Car>> GetAllCars() // Here ActionResult is used so that we can give status code aswell
                                                    // with the responses.
        {
            List<Car> c = carService.GetAllCars();
            return c;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]  
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        // the above can also be written as => [HttpGet] [Route("{id}", Name = "GetCarById")]
        public ActionResult<Car> GetCarById([FromRoute] int id) {
            Car? car = carService.GetCarById(id);
            if (id < 0)
                return BadRequest();
            if(car is null)
            {
                return NotFound("Car not Found.");
            }

            return Ok(car);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))] 
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Car> AddCar(CreateCarRequest request){
            Owner? owner = ownerService.GetOwnerById(request.OwnerId);
           
            if (owner is null)
            {
                return BadRequest("Owner not found.");
            }
            Car car = carService.AddCar(request);

            return CreatedAtAction(nameof(GetCarById), new { id = car.Id }, car);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]  
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> DeleteCar([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid car ID.");
            }

            List<TripBooking> trips =
                tripBookingService.GetBookingsByCarId(id);

            if (trips.Any())
            {
                return BadRequest(
                    "Cars having trips cannot be deleted.");
            }

            bool deleted = carService.DeleteCar(id);

            if (!deleted)
            {
                return NotFound("Car not found.");
            }

            return Ok("Car deleted successfully.");
        }

        // UpdateCar
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Car> UpdateCar([FromRoute] int id, UpdateCarRequest request)
        {
            if (id < 0)
                return BadRequest();

            Car c = carService.UpdateCar(id, request);
            if(c is null)
            {
                return NotFound("Car not found");
            }
            return Ok(c);
        }

        [HttpGet("available")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Car>> GetAvailableCars()
        {
            List<Car> availableCars = carService.GetAvailableCars();

            return Ok(availableCars);
        }

        [HttpGet("owner/{ownerId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Car>> GetCarsByOwnerId([FromRoute] int ownerId)
        {
            if (ownerId <= 0)
                return BadRequest();

            Owner? o = ownerService.GetOwnerById(ownerId);
            if(o is null)
            {
                return NotFound("Owner not found.");
            }

            return Ok(carService.GetCarsByOwnerId(ownerId));
        }
    }
}

// BadRequest() - Status Code 400, client error
// NotFound() - Status Code 404
