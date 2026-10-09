using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Venatorveritatis.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    CaseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseStatus = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.CaseId);
                });

            migrationBuilder.CreateTable(
                name: "Evidence",
                columns: table => new
                {
                    EvidenceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EvidenceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EvidenceDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EvidenceState = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evidence", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_Evidence_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Investigations",
                columns: table => new
                {
                    InvestigationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvestigationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvestigationDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvestigationLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Investigations", x => x.InvestigationId);
                    table.ForeignKey(
                        name: "FK_Investigations_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Suspects",
                columns: table => new
                {
                    SuspectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuspectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SuspectRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SuspectStatus = table.Column<bool>(type: "bit", nullable: false),
                    CaseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suspects", x => x.SuspectId);
                    table.ForeignKey(
                        name: "FK_Suspects_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Evidence_CaseId",
                table: "Evidence",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_CaseId",
                table: "Investigations",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Suspects_CaseId",
                table: "Suspects",
                column: "CaseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evidence");

            migrationBuilder.DropTable(
                name: "Investigations");

            migrationBuilder.DropTable(
                name: "Suspects");

            migrationBuilder.DropTable(
                name: "Cases");
        }
    }
}
