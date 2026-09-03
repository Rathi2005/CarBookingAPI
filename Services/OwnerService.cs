using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
namespace CarBookingAPI.Services
{
    public class OwnerService : IOwnerService
    {
        //private List<Owner> owners = new List<Owner>();
        //private int NextOwnerId = 1; 

        private readonly AppDbContext context;
        public OwnerService(AppDbContext context)
        {
            this.context = context;
        }

        public List<Owner> GetAllOwners()
        {
            return context.Owners.ToList();
        }

        public Owner? GetOwnerById(int id)
        {
            return context.Owners.FirstOrDefault(c => c.Id == id);
        }

        public Owner AddOwner(CreateOwnerRequest request)
        {
            Owner owner = new Owner
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email
            };

            context.Owners.Add(owner);
            context.SaveChanges();

            return owner;
        }

        public Owner UpdateOwner(int id, UpdateOwnerRequest request)
        {
            Owner? o = GetOwnerById(id);
            if(o is null)
            {
                return null;
            }

            o.Name = request.Name;
            o.Email = request.Email;
            o.PhoneNumber = request.PhoneNumber;

            context.SaveChanges();
            return o;
        }

        public bool DeleteOwner(int id)
        {
            Owner? o = GetOwnerById(id);
            if(o is null)
            {
                return false;
            }

            bool hasCars = context.Cars.Any(c => c.OwnerId == id);
            if (hasCars) return false;

            context.Owners.Remove(o);
            context.SaveChanges();

            return true;
        }
    }
}
