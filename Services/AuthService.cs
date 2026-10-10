using CarBookingAPI.Data;
using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using CarBookingAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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
            Owner? existingOwner = context.Owners
                .FirstOrDefault(owner => owner.Email == request.Email);

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

            return CreateAuthResponse(owner);
        }

        public AuthResponse? Login(LoginRequest request)
        {
            Owner? owner = context.Owners
                .FirstOrDefault(owner => owner.Email == request.Email);

            if (owner is null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                owner.PasswordHash
            );

            if (!isPasswordValid)
            {
                return null;
            }

            return CreateAuthResponse(owner);
        }

        public AuthResponse? Refresh(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return null;
            }

            string tokenHash = HashRefreshToken(refreshToken);

            RefreshToken? storedToken = context.RefreshTokens
                .FirstOrDefault(token => token.TokenHash == tokenHash);

            if (storedToken is null || !storedToken.IsActive)
            {
                return null;
            }

            Owner? owner = context.Owners
                .FirstOrDefault(owner => owner.Id == storedToken.OwnerId);

            if (owner is null)
            {
                return null;
            }

            storedToken.RevokedAt = DateTime.UtcNow;

            string newRefreshToken = GenerateRefreshToken();

            RefreshToken newStoredToken = new RefreshToken
            {
                OwnerId = owner.Id,
                TokenHash = HashRefreshToken(newRefreshToken),
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(30)
            };

            context.RefreshTokens.Add(newStoredToken);
            context.SaveChanges();

            return new AuthResponse
            {
                Token = GenerateJwtToken(owner),
                RefreshToken = newRefreshToken,
                UserId = owner.Id,
                Role = "Owner",
                Name = owner.Name,
                Email = owner.Email
            };
        }

        public bool RevokeRefreshToken(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return false;
            }

            string tokenHash = HashRefreshToken(refreshToken);

            RefreshToken? storedToken = context.RefreshTokens
                .FirstOrDefault(token => token.TokenHash == tokenHash);

            if (storedToken is null || storedToken.IsRevoked)
            {
                return false;
            }

            storedToken.RevokedAt = DateTime.UtcNow;
            context.SaveChanges();

            return true;
        }

        private AuthResponse CreateAuthResponse(Owner owner)
        {
            string refreshToken = GenerateRefreshToken();

            RefreshToken storedToken = new RefreshToken
            {
                OwnerId = owner.Id,
                TokenHash = HashRefreshToken(refreshToken),
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(30)
            };

            context.RefreshTokens.Add(storedToken);
            context.SaveChanges();

            return new AuthResponse
            {
                Token = GenerateJwtToken(owner),
                RefreshToken = refreshToken,
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

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            );

            SigningCredentials credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            byte[] randomBytes = RandomNumberGenerator.GetBytes(64);
            return Convert.ToBase64String(randomBytes);
        }

        private static string HashRefreshToken(string refreshToken)
        {
            byte[] tokenBytes = Encoding.UTF8.GetBytes(refreshToken);
            byte[] hashBytes = SHA256.HashData(tokenBytes);

            return Convert.ToHexString(hashBytes);
        }
    }
}
