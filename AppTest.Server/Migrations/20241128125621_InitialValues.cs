using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AppTest.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "Description", "Price", "Title" },
                values: new object[,]
                {
                    { 1, "Matias Aravena", "Describing how to survive in Germany under economic depression.", 29.99m, "Book of life" },
                    { 2, "Tomas Aravena", "How to find a job in a new field without having much experience.", 39.99m, "Understanding how to get employed" },
                    { 3, "Sandra Edwards", "How to make scientific people in the ghost and spirit realm.", 24.99m, "Magic for not believers" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
