using RecantoImperial.Api.Models;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IEventoService
    {
        Task<IEnumerable<Evento>> GetAllAsync();
        Task<Evento?> GetByIdAsync(int id);
        Task<Evento> CreateAsync(Evento evento);
    }
}
