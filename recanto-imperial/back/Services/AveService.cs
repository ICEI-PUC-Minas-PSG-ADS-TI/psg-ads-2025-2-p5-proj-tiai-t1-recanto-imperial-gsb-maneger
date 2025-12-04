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
    public class AveService : IAveService
    {
        private readonly AppDbContext _ctx;

        public AveService(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Ave> CreateAsync(Ave ave)
        {
            var exists = await _ctx.Aves.AnyAsync(a => a.Anilha == ave.Anilha);
            if (exists) throw new InvalidOperationException($"Anilha '{ave.Anilha}' já cadastrada.");

            var created = (await _ctx.Aves.AddAsync(ave)).Entity;
            await _ctx.SaveChangesAsync();

            await AtualizarPontuacaoERegistroAsync(created);
            return created;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ave = await _ctx.Aves.FindAsync(id);
            if (ave == null) return false;
            _ctx.Aves.Remove(ave);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Ave>> GetAllAsync()
        {
            return await _ctx.Aves.Include(a => a.Eventos).AsNoTracking().ToListAsync();
        }

        public async Task<Ave> GetByAnilhaAsync(string anilha)
        {
            return await _ctx.Aves.FirstOrDefaultAsync(a => a.Anilha == anilha);
        }

        public async Task<Ave> GetByIdAsync(int id)
        {
            return await _ctx.Aves.Include(a => a.Eventos).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Ave> UpdateAsync(Ave ave)
        {
            var existing = await _ctx.Aves.FindAsync(ave.Id);
            if (existing == null) throw new KeyNotFoundException("Ave não encontrada.");

            if (!string.Equals(existing.Anilha, ave.Anilha, StringComparison.OrdinalIgnoreCase))
            {
                var exists = await _ctx.Aves.AnyAsync(a => a.Anilha == ave.Anilha && a.Id != ave.Id);
                if (exists) throw new InvalidOperationException($"Anilha '{ave.Anilha}' já cadastrada.");
            }

            existing.Nome = ave.Nome;
            existing.Anilha = ave.Anilha;
            existing.Linhagem = ave.Linhagem;
            existing.Sexo = ave.Sexo;
            existing.DataNascimento = ave.DataNascimento;
            existing.Peso = ave.Peso;
            existing.CorBico = ave.CorBico;
            existing.Canelas = ave.Canelas;
            existing.Caracteristicas = ave.Caracteristicas;
            existing.FotoPath = ave.FotoPath;
            existing.Status = ave.Status;
            existing.StatusDescricao = ave.StatusDescricao;

            await _ctx.SaveChangesAsync();
            await AtualizarPontuacaoERegistroAsync(existing);

            return existing;
        }

        public async Task<Ave> AtualizarPontuacaoERegistroAsync(Ave ave)
        {
            ave.PontosTotais = ave.AuriculaPoints + ave.CristaPoints + ave.BarbelaPoints;

            if (ave.PontosTotais >= 3)
                ave.RegistroResultado = "Registrado";
            else if (ave.PontosTotais >= 1)
                ave.RegistroResultado = "Pendente";
            else
                ave.RegistroResultado = "Não Registrado";

            _ctx.Aves.Update(ave);
            await _ctx.SaveChangesAsync();
            return ave;
        }
    }
}
