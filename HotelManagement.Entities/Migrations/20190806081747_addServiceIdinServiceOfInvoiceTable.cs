using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class addServiceIdinServiceOfInvoiceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceOfInvoice_Service_ServiceId",
                table: "ServiceOfInvoice");

            migrationBuilder.AlterColumn<int>(
                name: "ServiceId",
                table: "ServiceOfInvoice",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceOfInvoice_Service_ServiceId",
                table: "ServiceOfInvoice",
                column: "ServiceId",
                principalTable: "Service",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceOfInvoice_Service_ServiceId",
                table: "ServiceOfInvoice");

            migrationBuilder.AlterColumn<int>(
                name: "ServiceId",
                table: "ServiceOfInvoice",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceOfInvoice_Service_ServiceId",
                table: "ServiceOfInvoice",
                column: "ServiceId",
                principalTable: "Service",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
