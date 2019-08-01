using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class updateRelationshipForInvoieAndBookedClientsList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Room_RoomName",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_BookedClientsList_BookedClientsListId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_BookedClientsListId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_RoomName",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "BookedClientsListId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "RoomName",
                table: "Invoice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookedClientsListId",
                table: "Room",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomName",
                table: "Invoice",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Room_BookedClientsListId",
                table: "Room",
                column: "BookedClientsListId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_RoomName",
                table: "Invoice",
                column: "RoomName");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Room_RoomName",
                table: "Invoice",
                column: "RoomName",
                principalTable: "Room",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_BookedClientsList_BookedClientsListId",
                table: "Room",
                column: "BookedClientsListId",
                principalTable: "BookedClientsList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
