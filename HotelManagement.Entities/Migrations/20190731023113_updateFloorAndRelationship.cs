using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class updateFloorAndRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Service_Room_Name",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_Name",
                table: "Service");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Service",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Floor",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Floor");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Service",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Service_Name",
                table: "Service",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Service_Room_Name",
                table: "Service",
                column: "Name",
                principalTable: "Room",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
