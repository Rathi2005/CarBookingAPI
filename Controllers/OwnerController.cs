using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using CarBookingAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService ownerService;
        private readonly ICarService carService;
        private readonly ITripBookingService tripBookingService;

        public OwnerController(IOwnerService ownerService, ICarService carService, ITripBookingService tripBookingService)
        {
            this.ownerService = ownerService;
            this.carService = carService;
            this.tripBookingService = tripBookingService;
        }

        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]

        //public ActionResult<List<Owner>> GetAllOwners()
        //{
        //    return ownerService.GetAllOwners();
        //}

        //[HttpGet("{id:int}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public ActionResult<Owner> GetOwnerById([FromRoute] int id)
        //{
        //    if (id <= 0)
        //        return BadRequest();

        //    Owner o = ownerService.GetOwnerById(id);
        //    if (o is null)
        //    {
        //        return NotFound("Owner not found");
        //    }
        //    return Ok(o);
        //}

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ActionResult<Owner> AddOwner(CreateOwnerRequest request)
        //{
        //    Owner o = ownerService.AddOwner(request);
        //    return CreatedAtAction(nameof(GetOwnerById), new { id = o.Id }, o);

        //}

        //[HttpPut("{id:int}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public ActionResult<Owner> UpdateOwner([FromRoute] int id, UpdateOwnerRequest request)
        //{
        //    if (id <= 0)
        //        return BadRequest();

        //    Owner o = ownerService.UpdateOwner(id, request);
        //    if (o is null)
        //    {
        //        return NotFound("Owner not found.");
        //    }

        //    return Ok(o);
        //}

        //[HttpDelete("{id:int}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public ActionResult<bool> DeleteOwner([FromRoute] int id)
        //{
        //    if (id <= 0)
        //        return BadRequest();

        //    List<Car> ownersCar = carService.GetCarsByOwnerId(id);

        //    if (ownersCar.Any())
        //        return BadRequest("Owner cannot be deleted because they have registered cars.");

        //    bool o = ownerService.DeleteOwner(id);
        //    if (!o)
        //        return NotFound("Owner not found.");


        //    return Ok(o);
        //}

        [Authorize]
        [HttpGet("me/trips")]
        public ActionResult<List<TripBookingResponse>> GetMyTrips()
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            List<TripBookingResponse> trips = tripBookingService.GetOwnersBooking(ownerId);

            return Ok(trips);
        }

        [Authorize]
        [HttpGet("me/reports/daily")]
        public ActionResult<OwnerDailyReportResponse> GetMyDailyReport([FromQuery] DateTime date)
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            if (date == default)
            {
                return BadRequest("Date is required.");
            }

            OwnerDailyReportResponse report = tripBookingService.GetDailyReportByOwnerId(ownerId, date);

            return Ok(report);
        }

        [Authorize]
        [HttpGet("me/reports/monthly")]
        public ActionResult<OwnerMonthlyReportResponse> GetMyMonthlyReport([FromQuery] int year, [FromQuery] int month)
        {
            string? ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(ownerIdClaim, out int ownerId))
            {
                return Unauthorized("Invalid token.");
            }

            if (year <= 0 || month < 1 || month > 12)
            {
                return BadRequest("Valid year and month are required.");
            }

            OwnerMonthlyReportResponse report = tripBookingService.GetMonthlyReportByOwnerId(ownerId, year, month);

            return Ok(report);
        }
    } 
}
