using CarBookingAPI.DTOs;
using CarBookingAPI.Models;

namespace CarBookingAPI.Interfaces
{
    public interface IOwnerService
    {
        public List<Owner> GetAllOwners();
        public Owner GetOwnerById(int id);
        public Owner AddOwner(CreateOwnerRequest request);
        public Owner UpdateOwner(int id, UpdateOwnerRequest request);
        public bool DeleteOwner(int id); 
    }
}
