using CarBookingAPI.DTOs;

namespace CarBookingAPI.Interfaces
{
    public interface IAuthService
    {
        public AuthResponse? Register(RegisterRequest request);
        public AuthResponse? Login(LoginRequest request);
        AuthResponse? Refresh(string refreshToken);
        bool RevokeRefreshToken(string refreshToken);
    }
}
