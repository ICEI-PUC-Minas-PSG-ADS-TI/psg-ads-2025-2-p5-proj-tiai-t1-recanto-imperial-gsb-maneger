using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace RecantoImperial.Api.Services
{
    public class RelatorioService : IRelatorioService
    {
        private readonly AppDbContext _ctx;

        public RelatorioService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Relatorio> CreateRelatorioAsync(string tipo, string caminhoArquivo)
        {
            var r = new Relatorio
            {
                Tipo = tipo,
                CaminhoArquivo = caminhoArquivo,
                DataGeracao = DateTime.UtcNow
            };

            await _ctx.Relatorios.AddAsync(r);
            await _ctx.SaveChangesAsync();
            return r;
        }

        public async Task<Relatorio> GerarFichaAvePdfAsync(int aveId, string destinoPasta)
        {
            var ave = await _ctx.Aves.AsNoTracking().FirstOrDefaultAsync(a => a.Id == aveId);
            if (ave == null) throw new KeyNotFoundException("Ave não encontrada.");

            if (!Directory.Exists(destinoPasta)) Directory.CreateDirectory(destinoPasta);

            var fileName = $"Ficha_Ave_{ave.Anilha}_{DateTime.UtcNow:yyyyMMddHHmmss}.pdf";
            var fullPath = Path.Combine(destinoPasta, fileName);

            var doc = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(20);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    page.Header()
                        .Column(col =>
                        {
                            col.Item().Text("Recanto Imperial - Ficha de Ave").Bold().FontSize(18);
                            col.Item().Text($"Anilha: {ave.Anilha}  |  Nome: {ave.Nome ?? "-"}");
                            col.Item().Text($"Linhagem: {ave.Linhagem ?? "-"}  |  Sexo: {ave.Sexo}");
                        });

                    page.Content()
                        .PaddingVertical(10)
                        .Column(content =>
                        {
                            content.Spacing(5);

                            content.Item().Text($"Data de Nascimento: {(ave.DataNascimento.HasValue ? ave.DataNascimento.Value.ToString("yyyy-MM-dd") : "-")}");
                            content.Item().Text($"Peso: {(ave.Peso.HasValue ? ave.Peso.Value.ToString("F2") : "-")}");
                            content.Item().Text($"Status: {ave.Status} - {ave.StatusDescricao}");
                            content.Item().Text($"Pontos Totais: {ave.PontosTotais}");
                            content.Item().Text("Características:");
                            content.Item().Text(ave.Caracteristicas ?? "-").LineHeight(1.2f);
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(txt => txt.Span($"Gerado em {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} - Recanto Imperial"));
                });
            });

            doc.GeneratePdf(fullPath);

            var rel = await CreateRelatorioAsync("FichaAve", fullPath);
            return rel;
        }
    }
}
