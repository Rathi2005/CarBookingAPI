using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentReceivedToTripBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPaymentReceived",
                table: "TripBookings",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaymentReceived",
                table: "TripBookings");
        }
    }
}
