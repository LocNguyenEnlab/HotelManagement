using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class deleteBookedClientsListTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_BookedClientsList_BookedClientsListId",
                table: "Client");

            migrationBuilder.DropTable(
                name: "BookedClientsList");

            migrationBuilder.DropIndex(
                name: "IX_Client_BookedClientsListId",
                table: "Client");

            migrationBuilder.RenameColumn(
                name: "BookedClientsListId",
                table: "Client",
                newName: "Code");

            migrationBuilder.AddColumn<string>(
                name: "BookType",
                table: "Client",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckinTime",
                table: "Client",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckoutTime",
                table: "Client",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Client",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Prepay",
                table: "Client",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Client",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookType",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "CheckinTime",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "CheckoutTime",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Prepay",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Client");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Client",
                newName: "BookedClientsListId");

            migrationBuilder.CreateTable(
                name: "BookedClientsList",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BookType = table.Column<string>(nullable: true),
                    CheckinTime = table.Column<DateTime>(nullable: false),
                    CheckoutTime = table.Column<DateTime>(nullable: false),
                    Code = table.Column<int>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    Discount = table.Column<double>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    Prepay = table.Column<double>(nullable: false),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookedClientsList", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_BookedClientsListId",
                table: "Client",
                column: "BookedClientsListId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Client_BookedClientsList_BookedClientsListId",
                table: "Client",
                column: "BookedClientsListId",
                principalTable: "BookedClientsList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
