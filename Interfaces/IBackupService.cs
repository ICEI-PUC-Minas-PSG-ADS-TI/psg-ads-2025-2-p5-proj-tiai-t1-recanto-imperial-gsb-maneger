using RecantoImperial.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services.Interfaces
{
    public interface IBackupService
    {
        Task<Backup> CreateBackupAsync(string destinoCompleto);
        Task<IEnumerable<Backup>> GetAllAsync();
    }
}
