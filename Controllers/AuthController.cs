using CarBookingAPI.DTOs;
using CarBookingAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CarBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public ActionResult<AuthResponse> Register([FromBody] RegisterRequest request)
        {
            AuthResponse? response = authService.Register(request);

            if (response is null)
            {
                return BadRequest("Email is already registered.");
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public ActionResult<AuthResponse> Login([FromBody] LoginRequest request)
        {
            AuthResponse? response = authService.Login(request);

            if (response is null)
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(response);
        }

        [HttpPost("refresh")]
        public ActionResult<AuthResponse> Refresh([FromBody] RefreshRequest request)
        {
            AuthResponse? response = authService.Refresh(request.RefreshToken);

            if (response is null)
            {
                return Unauthorized("Refresh token is invalid, expired, or revoked.");
            }

            return Ok(response);
        }

        [HttpPost("logout")]
        public IActionResult Logout([FromBody] RefreshRequest request)
        {
            authService.RevokeRefreshToken(request.RefreshToken);

            return Ok(new { message = "Logged out successfully." });
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult<object> GetMe()
        {
            string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            string? name = User.FindFirst(ClaimTypes.Name)?.Value;
            string? email = User.FindFirst(ClaimTypes.Email)?.Value;
            string? role = User.FindFirst(ClaimTypes.Role)?.Value;

            return Ok(new
            {
                UserId = userId,
                Name = name,
                Email = email,
                Role = role
            });
        }
    }
}
