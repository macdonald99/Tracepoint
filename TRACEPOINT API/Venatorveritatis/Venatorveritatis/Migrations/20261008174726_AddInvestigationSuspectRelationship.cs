using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Venatorveritatis.Migrations
{
    /// <inheritdoc />
    public partial class AddInvestigationSuspectRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Conclusion",
                table: "Investigations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStarted",
                table: "Investigations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "InvestigationSuspects",
                columns: table => new
                {
                    InvestigationId = table.Column<int>(type: "int", nullable: false),
                    SuspectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestigationSuspects", x => new { x.InvestigationId, x.SuspectId });
                    table.ForeignKey(
                        name: "FK_InvestigationSuspects_Investigations_InvestigationId",
                        column: x => x.InvestigationId,
                        principalTable: "Investigations",
                        principalColumn: "InvestigationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvestigationSuspects_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationSuspects_SuspectId",
                table: "InvestigationSuspects",
                column: "SuspectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvestigationSuspects");

            migrationBuilder.DropColumn(
                name: "Conclusion",
                table: "Investigations");

            migrationBuilder.DropColumn(
                name: "DateStarted",
                table: "Investigations");
        }
    }
}
