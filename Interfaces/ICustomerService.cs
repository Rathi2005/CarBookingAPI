using CarBookingAPI.DTOs;
using CarBookingAPI.Models;

namespace CarBookingAPI.Interfaces
{
    public interface ICustomerService
    {
        public List<Customer> GetAllCustomers();
        public Customer GetCustomerById(int id);

        public Customer AddCustomer(CreateCustomerRequest request);
        public Customer UpdateCustomer(int id, UpdateCustomerRequest request);

        public bool DeleteCustomer(int id);
    }
}
