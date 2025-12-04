using RecantoImperial.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface ICruzamentoService
    {
        Task<IEnumerable<Cruzamento>> GetAllAsync();
        Task<Cruzamento> GetByIdAsync(int id);
        Task<Cruzamento> CreateAsync(Cruzamento cruzamento, IEnumerable<(int aveId, string papel)> aves);
        Task<bool> DeleteAsync(int id);
    }
}
