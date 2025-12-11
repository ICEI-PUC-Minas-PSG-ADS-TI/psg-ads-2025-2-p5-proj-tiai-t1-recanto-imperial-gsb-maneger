using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecantoImperial.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Anilha = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Linhagem = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Sexo = table.Column<int>(type: "INTEGER", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Idade = table.Column<int>(type: "INTEGER", nullable: true),
                    Peso = table.Column<decimal>(type: "TEXT", nullable: true),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    CorBico = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Canelas = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    PlumagemPattern = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Caracteristicas = table.Column<string>(type: "TEXT", nullable: false),
                    AuriculaDespigPercent = table.Column<byte>(type: "INTEGER", nullable: false),
                    CristaTombamento = table.Column<string>(type: "TEXT", nullable: false),
                    BarbelaDesigualdadePercent = table.Column<decimal>(type: "TEXT", nullable: false),
                    PlumagemBarrada = table.Column<bool>(type: "INTEGER", nullable: false),
                    PlumagemFrisada = table.Column<bool>(type: "INTEGER", nullable: false),
                    PlumagemCarijo = table.Column<bool>(type: "INTEGER", nullable: false),
                    PescocoPelado = table.Column<bool>(type: "INTEGER", nullable: false),
                    Barbuda = table.Column<bool>(type: "INTEGER", nullable: false),
                    OlhosVermelhos = table.Column<bool>(type: "INTEGER", nullable: false),
                    AuriculaPoints = table.Column<int>(type: "INTEGER", nullable: false),
                    CristaPoints = table.Column<int>(type: "INTEGER", nullable: false),
                    BarbelaPoints = table.Column<int>(type: "INTEGER", nullable: false),
                    PontosTotais = table.Column<int>(type: "INTEGER", nullable: false),
                    RegistroResultado = table.Column<string>(type: "TEXT", nullable: false),
                    RegistroObservacoes = table.Column<string>(type: "TEXT", nullable: false),
                    FotoPath = table.Column<string>(type: "TEXT", nullable: false),
                    StatusDescricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aves", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Backups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Caminho = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Backups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cruzamentos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Observacoes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cruzamentos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Relatorios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Tipo = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    DataGeracao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CaminhoArquivo = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relatorios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AveId = table.Column<int>(type: "INTEGER", nullable: false),
                    TipoEvento = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Observacoes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eventos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Eventos_Aves_AveId",
                        column: x => x.AveId,
                        principalTable: "Aves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CruzamentoAves",
                columns: table => new
                {
                    CruzamentoId = table.Column<int>(type: "INTEGER", nullable: false),
                    AveId = table.Column<int>(type: "INTEGER", nullable: false),
                    Papel = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CruzamentoAves", x => new { x.CruzamentoId, x.AveId });
                    table.ForeignKey(
                        name: "FK_CruzamentoAves_Aves_AveId",
                        column: x => x.AveId,
                        principalTable: "Aves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CruzamentoAves_Cruzamentos_CruzamentoId",
                        column: x => x.CruzamentoId,
                        principalTable: "Cruzamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aves_Anilha",
                table: "Aves",
                column: "Anilha",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CruzamentoAves_AveId",
                table: "CruzamentoAves",
                column: "AveId");

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_AveId",
                table: "Eventos",
                column: "AveId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Backups");

            migrationBuilder.DropTable(
                name: "CruzamentoAves");

            migrationBuilder.DropTable(
                name: "Eventos");

            migrationBuilder.DropTable(
                name: "Relatorios");

            migrationBuilder.DropTable(
                name: "Cruzamentos");

            migrationBuilder.DropTable(
                name: "Aves");
        }
    }
}
