using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;

namespace RecantoImperial.Api.Services
{
    public class EventoService : IEventoService
    {
        private readonly AppDbContext _context;

        public EventoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Evento>> GetAllAsync()
        {
            return await _context.Eventos
                .AsNoTracking()
                .OrderByDescending(e => e.Data)
                .ToListAsync();
        }

        public async Task<Evento?> GetByIdAsync(int id)
        {
            return await _context.Eventos.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Evento> CreateAsync(Evento evento)
        {
            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();
            return evento;
        }
    }
}
