using System.Threading.Tasks;
using RecantoImperial.Api.Dtos;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IGenealogiaService
    {
        Task<GenealogiaDto> MontarPorAveIdAsync(int aveId);
        Task<GenealogiaDto> MontarPorAnilhaAsync(string anilha);
    }
}
