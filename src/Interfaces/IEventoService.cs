using RecantoImperial.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IEventoService
    {
        Task<IEnumerable<Evento>> GetAllAsync();
        Task<Evento> GetByIdAsync(int id);
        Task<Evento> CreateAsync(Evento evento);
        Task<bool> DeleteAsync(int id);
    }
}
