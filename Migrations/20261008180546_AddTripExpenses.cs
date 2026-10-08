using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTripExpenses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TripExpenses",
                table: "TripBookings",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TripExpenses",
                table: "TripBookings");
        }
    }
}
