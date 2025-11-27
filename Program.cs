using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Mappings;
using RecantoImperial.Api.Services;
using RecantoImperial.Api.Services.Interfaces;
using RecantoImperial.Api.Validators;
using QuestPDF;
using QuestPDF.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=recanto.db";
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseInMemoryDatabase("RecantoImperialDemo");
});

builder.Services.AddControllers()
    .AddFluentValidation(cfg =>
    {
        cfg.RegisterValidatorsFromAssemblyContaining<CreateAveDtoValidator>();
    });

builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

builder.Services.AddScoped<IAveService, AveService>();
builder.Services.AddScoped<ICruzamentoService, CruzamentoService>();
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();
builder.Services.AddScoped<IBackupService, BackupService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

QuestPDF.Settings.License = LicenseType.Community;

var app = builder.Build();

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
            CorBico = "Desconhecido",
            Canelas = "Desconhecido",
            PlumagemPattern = "Desconhecido",
            Caracteristicas = "Ave de demonstração",
            RegistroResultado = "N/A",
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
            RegistroResultado = "N/A",
            FotoPath = string.Empty,
            AuriculaPoints = 0,
            CristaPoints = 0,
            BarbelaPoints = 0,
            PontosTotais = 12
        });

        ctx.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
