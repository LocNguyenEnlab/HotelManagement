using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class updateRelationsipOfRoomTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_BookedClientsList_BookedClientsListId",
                table: "Room");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_Invoice_InvoiceId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_InvoiceId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Room");

            migrationBuilder.AlterColumn<int>(
                name: "BookedClientsListId",
                table: "Room",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "RoomName",
                table: "Invoice",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Room_RoomName",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_BookedClientsList_BookedClientsListId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_RoomName",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "RoomName",
                table: "Invoice");

            migrationBuilder.AlterColumn<int>(
                name: "BookedClientsListId",
                table: "Room",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Room",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Room_InvoiceId",
                table: "Room",
                column: "InvoiceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_BookedClientsList_BookedClientsListId",
                table: "Room",
                column: "BookedClientsListId",
                principalTable: "BookedClientsList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Invoice_InvoiceId",
                table: "Room",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
