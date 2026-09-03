using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TripBookings_CarId",
                table: "TripBookings",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_TripBookings_CustomerId",
                table: "TripBookings",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_OwnerId",
                table: "Cars",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Owners_OwnerId",
                table: "Cars",
                column: "OwnerId",
                principalTable: "Owners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TripBookings_Cars_CarId",
                table: "TripBookings",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TripBookings_Customers_CustomerId",
                table: "TripBookings",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Owners_OwnerId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_TripBookings_Cars_CarId",
                table: "TripBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_TripBookings_Customers_CustomerId",
                table: "TripBookings");

            migrationBuilder.DropIndex(
                name: "IX_TripBookings_CarId",
                table: "TripBookings");

            migrationBuilder.DropIndex(
                name: "IX_TripBookings_CustomerId",
                table: "TripBookings");

            migrationBuilder.DropIndex(
                name: "IX_Cars_OwnerId",
                table: "Cars");
        }
    }
}
