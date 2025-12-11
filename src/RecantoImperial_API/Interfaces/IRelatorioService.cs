using RecantoImperial.Api.Models;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IRelatorioService
    {
        Task<Relatorio> CreateRelatorioAsync(string tipo, string caminhoArquivo);
        Task<Relatorio> GerarFichaAvePdfAsync(int aveId, string destinoPasta);
    }
}
