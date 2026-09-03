using CarBookingAPI.Data;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// swagger
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// the below functionality helps to ignore the cyclic behaviour of .Include() causing infinite loop
// eg:- car.Owner => car has owner, owner has cars, then again car has owner and so on.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler =
    ReferenceHandler.IgnoreCycles;
});

builder.Services.AddScoped<ICarService ,CarService>(); // dependency injection registration
builder.Services.AddScoped<IOwnerService ,OwnerService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ITripBookingService, TripBookingService>();

// Registering the AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); // Adds a modern browser UI

    // 2. This points Swagger UI to look at that exact JSON endpoint
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });

}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();// This activates the Routing Engine. It tells the engine to look at the [Route] and
                     // [HttpGet/HttpPost] attributes you typed inside your controller so it knows exactly
                     // which URLs belong to which methods.

app.Run();
