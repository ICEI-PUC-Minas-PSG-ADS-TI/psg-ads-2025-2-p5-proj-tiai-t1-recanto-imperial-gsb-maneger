using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;

namespace RecantoImperial.Api.Services
{
    public class CruzamentoService : ICruzamentoService
    {
        private readonly AppDbContext _ctx;

        public CruzamentoService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Cruzamento>> ListarAsync()
        {
            return await _ctx.Cruzamentos
                .Include(c => c.CruzamentoAves)
                    .ThenInclude(ca => ca.Ave)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Cruzamento?> ObterPorIdAsync(int id)
        {
            return await _ctx.Cruzamentos
                .Include(c => c.CruzamentoAves)
                    .ThenInclude(ca => ca.Ave)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Cruzamento> CriarAsync(CreateCruzamentoDto dto)
        {

            if (dto.Aves is null || dto.Aves.Count < 3)
                throw new InvalidOperationException("Um cruzamento deve ter Pai, Mãe e pelo menos um Filho.");

            if (dto.Aves.Count(a => a.Papel == "Pai") != 1)
                throw new InvalidOperationException("O cruzamento deve ter exatamente um Pai.");

            if (dto.Aves.Count(a => a.Papel == "Mae") != 1)
                throw new InvalidOperationException("O cruzamento deve ter exatamente uma Mãe.");

            if (!dto.Aves.Any(a => a.Papel == "Filho"))
                throw new InvalidOperationException("O cruzamento deve ter pelo menos um Filho.");

            var idsAves = dto.Aves
                .Select(a => a.AveId)
                .Distinct()
                .ToList();

            var avesBanco = await _ctx.Aves
                .Where(a => idsAves.Contains(a.Id))
                .ToDictionaryAsync(a => a.Id);

            if (avesBanco.Count != idsAves.Count)
            {
                throw new InvalidOperationException(
                    "Uma ou mais aves informadas no cruzamento não existem no cadastro.");
            }

            var cruzamento = new Cruzamento
            {
                Data = DateTime.UtcNow.Date,
                Observacoes = dto.Observacoes ?? string.Empty,
                CruzamentoAves = new List<CruzamentoAves>()
            };

            foreach (var item in dto.Aves)
            {
                if (!avesBanco.TryGetValue(item.AveId, out var ave))
                    throw new InvalidOperationException($"Ave com Id {item.AveId} não encontrada.");

                var ca = new CruzamentoAves
                {
                    Cruzamento = cruzamento,
                    AveId = ave.Id,
                    Papel = item.Papel
                };

                cruzamento.CruzamentoAves.Add(ca);
            }

            _ctx.Cruzamentos.Add(cruzamento);
            await _ctx.SaveChangesAsync();

            await _ctx.Entry(cruzamento)
                .Collection(c => c.CruzamentoAves)
                .Query()
                .Include(ca => ca.Ave)
                .LoadAsync();

            return cruzamento;
        }

        public async Task<bool> ExcluirAsync(int id)
        {
            var cruz = await _ctx.Cruzamentos
                .Include(c => c.CruzamentoAves)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cruz == null)
                return false;

            _ctx.Cruzamentos.Remove(cruz);
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}
