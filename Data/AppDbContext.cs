using CarBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarBookingAPI.Data
{
    public class AppDbContext : DbContext    
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Owner> Owners { get; set;  }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<TripBooking> TripBookings { get; set; }
    }
}

// we create a context file for a database.

//Install - Package Microsoft.EntityFrameworkCore.SqlServer   -> this tells which db to connect with (the db provider)
//Install-Package Microsoft.EntityFrameworkCore.Tools       -> This helps in specific tasks like db migration
//Install-Package Microsoft.EntityFrameworkCore.Design  -> this help to convert tebles to class and classes to tables in DB first and code first approach.

