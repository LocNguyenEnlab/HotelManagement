using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelManagement.Entities.Migrations
{
    public partial class udpateRelationshipServiceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Service_ServiceType_ServiceTypeId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_ServiceTypeId",
                table: "Service");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Service_ServiceTypeId",
                table: "Service",
                column: "ServiceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Service_ServiceType_ServiceTypeId",
                table: "Service",
                column: "ServiceTypeId",
                principalTable: "ServiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
