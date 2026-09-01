using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;

namespace CarBookingAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext context;

        public CustomerService(AppDbContext context)
        {
            this.context = context;
        }

        public List<Customer> GetAllCustomers()
        {
            return context.Customers.ToList();
        }

        public Customer? GetCustomerById(int id)
        {
            return context.Customers.FirstOrDefault(c => c.Id == id);
        }

        public Customer AddCustomer(CreateCustomerRequest request)
        {
            Customer c = new Customer
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email
            };

            context.Customers.Add(c);
            context.SaveChanges();
            return c;
        }

        public Customer UpdateCustomer(int id, UpdateCustomerRequest request)
        {
            Customer? c = context.Customers.FirstOrDefault(c => c.Id == id);
            if(c is null)
            {
                return null;
            }

            c.Name = request.Name;
            c.PhoneNumber = request.PhoneNumber;
            c.Email = request.Email;

            context.SaveChanges();
            return c;
        }

        public bool DeleteCustomer(int id)
        {
            Customer? c = context.Customers.FirstOrDefault(c => c.Id == id);
            if (c is null)
            {
                return false;
            }

            context.Customers.Remove(c);
            context.SaveChanges();

            return true;
        }
    }
}
