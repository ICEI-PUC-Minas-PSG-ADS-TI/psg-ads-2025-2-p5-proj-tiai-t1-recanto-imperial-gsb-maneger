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
    public class CruzamentoService : ICruzamentoService
    {
        private readonly AppDbContext _ctx;

        public CruzamentoService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Cruzamento> CreateAsync(Cruzamento cruzamento, IEnumerable<(int aveId, string papel)> aves)
        {
            var aveIds = aves.Select(a => a.aveId).ToList();
            var avesDb = await _ctx.Aves.Where(a => aveIds.Contains(a.Id)).ToListAsync();

            if (avesDb.Count != aveIds.Count)
                throw new InvalidOperationException("Uma ou mais aves não estão cadastradas.");

            var inativas = avesDb.Where(a => a.Status != StatusAve.Ativa).ToList();
            if (inativas.Any())
                throw new InvalidOperationException("Todas as aves do cruzamento devem estar ativas.");

            using var tx = await _ctx.Database.BeginTransactionAsync();
            try
            {
                await _ctx.Cruzamentos.AddAsync(cruzamento);
                await _ctx.SaveChangesAsync();

                foreach (var (aveId, papel) in aves)
                {
                    var ca = new CruzamentoAves
                    {
                        CruzamentoId = cruzamento.Id,
                        AveId = aveId,
                        Papel = papel
                    };
                    await _ctx.CruzamentoAves.AddAsync(ca);
                }

                await _ctx.SaveChangesAsync();
                await tx.CommitAsync();

                return await GetByIdAsync(cruzamento.Id);
            }
            catch
            {
                await tx.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var c = await _ctx.Cruzamentos.FindAsync(id);
            if (c == null) return false;
            _ctx.Cruzamentos.Remove(c);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Cruzamento>> GetAllAsync()
        {
            return await _ctx.Cruzamentos
                .Include(c => c.CruzamentoAves)
                .ThenInclude(ca => ca.Ave)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Cruzamento> GetByIdAsync(int id)
        {
            return await _ctx.Cruzamentos
                .Include(c => c.CruzamentoAves)
                .ThenInclude(ca => ca.Ave)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
