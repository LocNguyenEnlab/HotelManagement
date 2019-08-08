using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class changeFieldName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalMoney",
                table: "ServiceOfInvoice",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "TotalServiceMoney",
                table: "Invoice",
                newName: "TotalServiceAmount");

            migrationBuilder.RenameColumn(
                name: "TotalRoomMoney",
                table: "Invoice",
                newName: "TotalRoomAmount");

            migrationBuilder.RenameColumn(
                name: "TotalPayment",
                table: "Invoice",
                newName: "TotalAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "ServiceOfInvoice",
                newName: "TotalMoney");

            migrationBuilder.RenameColumn(
                name: "TotalServiceAmount",
                table: "Invoice",
                newName: "TotalServiceMoney");

            migrationBuilder.RenameColumn(
                name: "TotalRoomAmount",
                table: "Invoice",
                newName: "TotalRoomMoney");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Invoice",
                newName: "TotalPayment");
        }
    }
}
