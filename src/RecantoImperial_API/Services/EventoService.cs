using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services
{
    public class EventoService : IEventoService
    {
        private readonly AppDbContext _ctx;

        public EventoService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Evento> CreateAsync(Evento evento)
        {
            var ave = await _ctx.Aves.FindAsync(evento.AveId);
            if (ave == null) throw new KeyNotFoundException("Ave não encontrada.");

            if (evento.TipoEvento.Equals("Óbito", StringComparison.OrdinalIgnoreCase) ||
                evento.TipoEvento.Equals("Obito", StringComparison.OrdinalIgnoreCase))
            {
                ave.Status = StatusAve.Falecida;
            }
            else if (evento.TipoEvento.Equals("Venda", StringComparison.OrdinalIgnoreCase))
            {
                ave.Status = StatusAve.Vendida;
            }

            _ctx.Eventos.Add(evento);
            await _ctx.SaveChangesAsync();
            return evento;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ev = await _ctx.Eventos.FindAsync(id);
            if (ev == null) return false;
            _ctx.Eventos.Remove(ev);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Evento>> GetAllAsync()
        {
            return await _ctx.Eventos.Include(e => e.Ave).AsNoTracking().ToListAsync();
        }

        public async Task<Evento> GetByIdAsync(int id)
        {
            return await _ctx.Eventos.Include(e => e.Ave).FirstOrDefaultAsync(e => e.Id == id);
        }
    }
}
