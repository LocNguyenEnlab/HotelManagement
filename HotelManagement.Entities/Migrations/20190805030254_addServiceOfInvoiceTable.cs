using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class addServiceOfInvoiceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client");

            migrationBuilder.DropForeignKey(
                name: "FK_Service_Invoice_InvoiceId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_InvoiceId",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "TotalMoney",
                table: "Service");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "Client",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ServiceOfInvoice",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<int>(nullable: false),
                    TotalMoney = table.Column<double>(nullable: false),
                    ServiceId = table.Column<int>(nullable: true),
                    InvoiceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceOfInvoice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceOfInvoice_Invoice_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceOfInvoice_Service_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Service",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceOfInvoice_InvoiceId",
                table: "ServiceOfInvoice",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceOfInvoice_ServiceId",
                table: "ServiceOfInvoice",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client");

            migrationBuilder.DropTable(
                name: "ServiceOfInvoice");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Service",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Service",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "TotalMoney",
                table: "Service",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "Client",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Service_InvoiceId",
                table: "Service",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Invoice_InvoiceId",
                table: "Client",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Service_Invoice_InvoiceId",
                table: "Service",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
