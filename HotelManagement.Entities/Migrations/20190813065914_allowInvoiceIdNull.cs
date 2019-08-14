using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class allowInvoiceIdNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "Client",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "Client",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
