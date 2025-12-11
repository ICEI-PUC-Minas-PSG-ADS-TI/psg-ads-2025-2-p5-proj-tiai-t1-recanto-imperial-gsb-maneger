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
builder.Services.AddScoped<IBackupService, BackupService>();


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

// ================== CORS ==================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin();
    });
});

// ================== QuestPDF ==================
QuestPDF.Settings.License = LicenseType.Community;

var app = builder.Build();

// ================== CRIA BANCO E SEED ==================
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
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
            Caracteristicas = "Ave de demonstração",
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
            Caracteristicas = "Ave de demonstração",
            AuriculaPoints = 0,
            CristaPoints = 0,
            BarbelaPoints = 0,
            PontosTotais = 12
        });

        ctx.SaveChanges();
    }
}

// ================== PIPELINE HTTP ==================
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "RecantoImperial API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowFront");
app.MapControllers();
app.Run();
