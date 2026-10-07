using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCarDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DriverName",
                table: "Cars",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriverPhoneNumber",
                table: "Cars",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Cars",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberPlate",
                table: "Cars",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DriverName",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "DriverPhoneNumber",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "NumberPlate",
                table: "Cars");
        }
    }
}
