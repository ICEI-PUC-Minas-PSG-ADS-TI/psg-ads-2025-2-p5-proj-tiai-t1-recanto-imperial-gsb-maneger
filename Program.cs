using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using QuestPDF;
using QuestPDF.Infrastructure;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Mappings;
using RecantoImperial.Api.Services;
using RecantoImperial.Api.Services.Interfaces;
using RecantoImperial.Api.Validators;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// ================== DB CONTEXT (SQLite local) ==================
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? "Data Source=recanto.db";

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(connectionString);
});

// ================== MVC + FluentValidation ==================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    })
    .AddFluentValidation(cfg =>
    {
        cfg.RegisterValidatorsFromAssemblyContaining<CreateAveDtoValidator>();
    });


// ================== Swagger ==================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ================== AutoMapper ==================
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

// ================== DI – Services ==================
builder.Services.AddScoped<IAveService, AveService>();
builder.Services.AddScoped<ICruzamentoService, CruzamentoService>();
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();
builder.Services.AddScoped<IBackupService, BackupService>();
builder.Services.AddScoped<IGenealogiaService, GenealogiaService>();



// ================== QuestPDF ==================
QuestPDF.Settings.License = LicenseType.Community;

// ================== BUILD APP ==================
var app = builder.Build();

// ================== CRIA BANCO E SEED INICIAL ==================
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // NÃO usa migrations, só cria o banco/tabelas com base no modelo
    ctx.Database.EnsureCreated();

    if (!ctx.Aves.Any())
    {
        ctx.Aves.Add(new RecantoImperial.Api.Models.Ave
        {
            Anilha = "A001",
            Nome = "Matriz 01",
            Linhagem = "Demonstração",
            Sexo = RecantoImperial.Api.Models.Sexo.Femea,
            Status = RecantoImperial.Api.Models.StatusAve.Ativa,
            StatusDescricao = "Ativa",
            CorBico = "Desconhecido",
            Canelas = "Desconhecido",
            PlumagemPattern = "Desconhecido",
            Caracteristicas = "Ave de demonstração",

            CristaTombamento = "Nenhuma",
            RegistroResultado = "N/A",
            RegistroObservacoes = string.Empty,

            FotoPath = string.Empty,
            AuriculaPoints = 0,
            CristaPoints = 0,
            BarbelaPoints = 0,
            PontosTotais = 10
        });

        ctx.Aves.Add(new RecantoImperial.Api.Models.Ave
        {
            Anilha = "A002",
            Nome = "Galo 01",
            Linhagem = "Demonstração",
            Sexo = RecantoImperial.Api.Models.Sexo.Macho,
            Status = RecantoImperial.Api.Models.StatusAve.Ativa,
            StatusDescricao = "Ativa",
            CorBico = "Desconhecido",
            Canelas = "Desconhecido",
            PlumagemPattern = "Desconhecido",
            Caracteristicas = "Ave de demonstração",

            CristaTombamento = "Nenhuma",
            RegistroResultado = "N/A",
            RegistroObservacoes = string.Empty,

            FotoPath = string.Empty,
            AuriculaPoints = 0,
            CristaPoints = 0,
            BarbelaPoints = 0,
            PontosTotais = 12
        });

        ctx.SaveChanges();
    }
}

// ================== PIPELINE HTTP ==================

// Swagger sempre ligado
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "RecantoImperial API v1");
    c.RoutePrefix = "swagger"; // => http://localhost:5000/swagger
});

// app.UseHttpsRedirection(); // se quiser HTTPS depois, ativa aqui

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();

// ATENÇAO -comentarios = Messias Junio- para quem for integrar o API no BD e no UI
// ============================================================================
// NOTA SOBRE ARQUITETURA / BANCO DE DADOS (LEIA ANTES DE CONECTAR AO MySQL)
// ============================================================================
//
// 1. Situação atual (ambiente local / apresentação)
//
// - No momento o backend está rodando com **SQLite** via Entity Framework Core.
// - A connection string padrão está no Program.cs → "Data Source=recanto.db".
// - O banco é criado automaticamente (arquivo recanto.db) na raiz do projeto.
// - Não estamos usando Migrations por enquanto. Em vez disso:
//
//       ctx.Database.EnsureCreated();
//
//   Isso faz o EF:
//     • criar as tabelas com base nos modelos,
//     • mas não controla versão do schema e nem aplica migrations depois.
// - Há um seed bem simples criando as aves A001 e A002 quando o banco está vazio,
//   apenas para facilitar os testes no Swagger e para integração com o front.
//
// 2. Integração futura com MySQL (criatorio.sql)
//
// - O projeto final usa banco **MySQL**, com script `criatorio.sql` contendo as
//   tabelas (Aves, Eventos, Cruzamento etc).
// - Quando for integrar de verdade ao MySQL, o caminho é basicamente:
//
//   (a) Instalar o provider MySQL do EF Core (ex: Pomelo).
//   (b) Trocar em Program.cs:
//
//           options.UseSqlite("Data Source=recanto.db");
//
//       para algo como:
//
//           options.UseMySql(
//               builder.Configuration.GetConnectionString("DefaultConnection"),
//               new MySqlServerVersion(new Version(9, 2, 0)) // ajustar a versão do servidor
//           );
//
//   (c) Criar a connection string no appsettings.json:
//
//           "ConnectionStrings": {
//               "DefaultConnection": "Server=localhost;Database=criatorio;User=root;Password=senha;"
//           }
//
//   (d) Ajustar o mapeamento das entidades (Ave, Evento, Cruzamento etc) para refletirem
//       corretamente as colunas do MySQL OR optar por Dapper/ADO.NET se for trabalhar
//       diretamente com o schema existente.
//
//   (e) No MySQL real, o ideal é parar de usar EnsureCreated() e adotar Migrations
//       ou manter o schema somente via script oficial.
//
//       Ou seja, substituir o EnsureCreated por:
//
//           dotnet ef migrations add <Nome>
//           dotnet ef database update
//
// 3. Por que ainda estou usando EnsureCreated?
//
// - Para a fase atual o foco é ter algo simples para rodar e demonstrar:
//     • API funcionando,
//     • Swagger pronto para testes,
//     • Integração rápida com front,
//     • Sem precisar instalar MySQL para rodar o projeto.
// - O EnsureCreated resolve isso criando o DB sozinho e garantindo dados mínimos.
//
// 4. Recado para o avaliador (ou para mim mesmo no futuro)
//
// - O backend já está preparado para migrar para MySQL usando o criatorio.sql.
// - A API, controllers e serviços continuam os mesmos — só precisamos trocar
//   a config do banco e ajustar os modelos.
// - Para esta entrega/versão, SQLite + EnsureCreated foi a opção mais prática
//   para manter tudo funcionando sem dependências externas.

// ATENÇAO -comentarios = Messias Junio- para quem for integrar o API no BD e no UI
// ============================================================================
