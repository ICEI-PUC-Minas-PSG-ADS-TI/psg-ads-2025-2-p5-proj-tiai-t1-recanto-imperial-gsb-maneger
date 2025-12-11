using System.Collections.Generic;
using System.Threading.Tasks;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface ICruzamentoService
    {
        Task<List<Cruzamento>> ListarAsync();
        Task<Cruzamento?> ObterPorIdAsync(int id);
        Task<Cruzamento> CriarAsync(CreateCruzamentoDto dto);
        Task<bool> ExcluirAsync(int id);
    }
}
