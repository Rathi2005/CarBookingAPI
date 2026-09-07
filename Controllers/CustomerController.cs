using CarBookingAPI.Models;
using CarBookingAPI.Services;
using CarBookingAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CarBookingAPI.DTOs;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService customerService;
        private readonly ITripBookingService tripBookingService;

        public CustomersController(ICustomerService customerService, ITripBookingService tripBookingService)
        {
            this.customerService = customerService;
            this.tripBookingService = tripBookingService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Customer>> GetAllCustomers()
        {
            List<Customer> customers = customerService.GetAllCustomers();

            return Ok(customers);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Customer> GetCustomerById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid customer ID.");
            }

            Customer? customer = customerService.GetCustomerById(id);

            if (customer is null)
            {
                return NotFound("Customer not found.");
            }

            return Ok(customer);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Customer> CreateCustomer([FromBody] CreateCustomerRequest request)
        {

            Customer customer = customerService.AddCustomer(request);

            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.Id }, customer);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Customer> UpdateCustomer([FromRoute] int id, [FromBody] UpdateCustomerRequest request)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid customer ID.");
            }

            Customer updated = customerService.UpdateCustomer(id, request);

            if (updated is null)
            {
                return NotFound("Customer not found.");
            }

            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> DeleteCustomer([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid customer ID.");
            }

            List<TripBookingResponse> trips = tripBookingService.GetBookingsByCustomerId(id);

            if (trips.Any())
                return BadRequest("Customers with trips cannot be deleted.");

            bool deleted = customerService.DeleteCustomer(id);

            if (!deleted)
            {
                return NotFound("Customer not found.");
            }

            return Ok(deleted);
        }
    }
}
