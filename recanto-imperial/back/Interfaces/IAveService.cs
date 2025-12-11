using RecantoImperial.Api.Models;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IAveService
    {
        Task<IEnumerable<Ave>> GetAllAsync();
        Task<Ave?> GetByIdAsync(int id);
        Task<Ave?> GetByAnilhaAsync(string anilha);
        Task<Ave> CreateAsync(Ave ave);
        Task<Ave> UpdateAsync(Ave ave);
        Task<bool> DeleteAsync(int id);
    }
}
