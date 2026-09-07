using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarBookingAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext context;
        private readonly IConfiguration configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        public AuthResponse? Register(RegisterRequest request)
        {
            Owner? existingOwner = context.Owners.FirstOrDefault(owner => owner.Email == request.Email);

            if (existingOwner is not null)
            {
                return null;
            }

            Owner owner = new Owner
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            context.Owners.Add(owner);
            context.SaveChanges();

            string token = GenerateJwtToken(owner);

            return new AuthResponse
            {
                Token = token,
                UserId = owner.Id,
                Role = "Owner",
                Name = owner.Name,
                Email = owner.Email
            };
        }

        public AuthResponse? Login(LoginRequest request)
        {
            Owner? owner = context.Owners.FirstOrDefault(owner => owner.Email == request.Email);

            if (owner is null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, owner.PasswordHash);

            if (!isPasswordValid)
            {
                return null;
            }

            string token = GenerateJwtToken(owner);

            return new AuthResponse
            {
                Token = token,
                UserId = owner.Id,
                Role = "Owner",
                Name = owner.Name,
                Email = owner.Email
            };
        }

        private string GenerateJwtToken(Owner owner)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, owner.Id.ToString()),
                new Claim(ClaimTypes.Name, owner.Name),
                new Claim(ClaimTypes.Email, owner.Email),
                new Claim(ClaimTypes.Role, "Owner")
            };

            string key = configuration["Jwt:Key"]!;

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
