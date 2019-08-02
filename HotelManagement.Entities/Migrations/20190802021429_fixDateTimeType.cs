using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class fixDateTimeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckoutTime",
                table: "Room",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CheckinTime",
                table: "Room",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CheckoutTime",
                table: "Room",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "CheckinTime",
                table: "Room",
                nullable: true,
                oldClrType: typeof(DateTime));
        }
    }
}
