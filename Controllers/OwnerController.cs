using CarBookingAPI.Services;
using CarBookingAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CarBookingAPI.Models;
using CarBookingAPI.DTOs;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService ownerService;

        public OwnerController(IOwnerService ownerService)
        {
            this.ownerService = ownerService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<List<Owner>> GetAllOwners()
        {
            return ownerService.GetAllOwners();
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Owner> GetOwnerById([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest();

            Owner o = ownerService.GetOwnerById(id);
            if (o is null)
            {
                return NotFound("Owner not found");
            }
            return Ok(o);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public ActionResult<Owner> AddOwner(CreateOwnerRequest request)
        {
            Owner o = ownerService.AddOwner(request);
            return CreatedAtAction(nameof(GetOwnerById), new { id = o.Id }, o);

        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Owner> UpdateOwner([FromRoute] int id, UpdateOwnerRequest request)
        {
            if (id <= 0)
                return BadRequest();

            Owner o = ownerService.UpdateOwner(id, request);
            if (o is null)
            {
                return NotFound("Owner not found.");
            }

            return Ok(o);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<bool> DeleteOwner([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest();

            bool o = ownerService.DeleteOwner(id);

            if (!o)
                return NotFound("Owner not found.");

            return Ok(o);
        }
    } 
}
