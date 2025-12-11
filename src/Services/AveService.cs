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
            if (exists)
                throw new InvalidOperationException($"Anilha '{ave.Anilha}' já cadastrada.");

            if (ave.Status == default)
                ave.Status = StatusAve.Ativa;

            ave.CorBico = string.IsNullOrWhiteSpace(ave.CorBico) ? "Desconhecido" : ave.CorBico;
            ave.Canelas = string.IsNullOrWhiteSpace(ave.Canelas) ? "Desconhecido" : ave.Canelas;
            ave.PlumagemPattern = string.IsNullOrWhiteSpace(ave.PlumagemPattern) ? "Desconhecido" : ave.PlumagemPattern;
            ave.Caracteristicas = string.IsNullOrWhiteSpace(ave.Caracteristicas) ? string.Empty : ave.Caracteristicas;
            ave.CristaTombamento = string.IsNullOrWhiteSpace(ave.CristaTombamento) ? "Nenhuma" : ave.CristaTombamento;
            ave.RegistroResultado = string.IsNullOrWhiteSpace(ave.RegistroResultado) ? "N/A" : ave.RegistroResultado;
            ave.RegistroObservacoes = string.IsNullOrWhiteSpace(ave.RegistroObservacoes)
                                      ? string.Empty
                                      : ave.RegistroObservacoes;
            ave.StatusDescricao = string.IsNullOrWhiteSpace(ave.StatusDescricao) ? "Ativa" : ave.StatusDescricao;
            ave.FotoPath = ave.FotoPath ?? string.Empty;

            ave.AuriculaPoints = ave.AuriculaPoints;
            ave.CristaPoints = ave.CristaPoints;
            ave.BarbelaPoints = ave.BarbelaPoints;
            ave.PontosTotais = ave.PontosTotais;

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
            return await _ctx.Aves
                .Include(a => a.Eventos)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Ave> GetByAnilhaAsync(string anilha)
        {
            return await _ctx.Aves
                .FirstOrDefaultAsync(a => a.Anilha == anilha);
        }

        public async Task<Ave> GetByIdAsync(int id)
        {
            return await _ctx.Aves
                .Include(a => a.Eventos)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Ave> UpdateAsync(Ave ave)
        {
            var existing = await _ctx.Aves.FindAsync(ave.Id);
            if (existing == null)
                throw new KeyNotFoundException("Ave não encontrada.");

            if (!string.Equals(existing.Anilha, ave.Anilha, StringComparison.OrdinalIgnoreCase))
            {
                var exists = await _ctx.Aves.AnyAsync(a => a.Anilha == ave.Anilha && a.Id != ave.Id);
                if (exists)
                    throw new InvalidOperationException($"Anilha '{ave.Anilha}' já cadastrada.");
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
            existing.FotoPath = ave.FotoPath ?? string.Empty;
            existing.Status = ave.Status;
            existing.StatusDescricao = ave.StatusDescricao;

            existing.PlumagemPattern = ave.PlumagemPattern;
            existing.AuriculaDespigPercent = ave.AuriculaDespigPercent;
            existing.CristaTombamento = ave.CristaTombamento;
            existing.BarbelaDesigualdadePercent = ave.BarbelaDesigualdadePercent;
            existing.PlumagemBarrada = ave.PlumagemBarrada;
            existing.PlumagemFrisada = ave.PlumagemFrisada;
            existing.PlumagemCarijo = ave.PlumagemCarijo;
            existing.PescocoPelado = ave.PescocoPelado;
            existing.Barbuda = ave.Barbuda;
            existing.OlhosVermelhos = ave.OlhosVermelhos;

            await _ctx.SaveChangesAsync();
            await AtualizarPontuacaoERegistroAsync(existing);

            return existing;
        }

        public async Task<Ave> AtualizarPontuacaoERegistroAsync(Ave ave)
        {
            if (ave.AuriculaDespigPercent >= 30 && ave.AuriculaDespigPercent <= 50)
                ave.AuriculaPoints = 1;
            else if (ave.AuriculaDespigPercent > 50)
                ave.AuriculaPoints = 2;
            else
                ave.AuriculaPoints = 0;

            var crista = (ave.CristaTombamento ?? string.Empty).Trim();

            if (crista.Equals("TercoDistal", StringComparison.OrdinalIgnoreCase))
                ave.CristaPoints = 1;
            else if (crista.Equals("DoisTerços", StringComparison.OrdinalIgnoreCase) ||
                     crista.Equals("DoisTercos", StringComparison.OrdinalIgnoreCase))
                ave.CristaPoints = 2;
            else
                ave.CristaPoints = 0;

            if (ave.BarbelaDesigualdadePercent > 5)
                ave.BarbelaPoints = 2;
            else if (ave.BarbelaDesigualdadePercent > 0)
                ave.BarbelaPoints = 1;
            else
                ave.BarbelaPoints = 0;

            ave.PontosTotais = ave.AuriculaPoints + ave.CristaPoints + ave.BarbelaPoints;

            bool temFalhaGraveMorfologia =
                ave.PlumagemBarrada ||
                ave.PlumagemFrisada ||
                ave.PlumagemCarijo ||
                ave.PescocoPelado ||
                ave.Barbuda ||
                ave.OlhosVermelhos;

            if (temFalhaGraveMorfologia)
            {
                ave.RegistroResultado = "Não Registrado";
                ave.RegistroObservacoes = "Não Registrado: falha morfológica grave (plumagem/caráter desclassificante).";
            }
            else if (ave.PontosTotais >= 2)
            {
                ave.RegistroResultado = "Não Registrado";
                ave.RegistroObservacoes = "Não Registrado: excesso de penalizações de aurícula/crista/barbela.";
            }
            else if (ave.PontosTotais == 1)
            {
                ave.RegistroResultado = "Pendente";
                ave.RegistroObservacoes = "Pendente: apresenta uma penalização leve; recomenda-se acompanhamento.";
            }
            else
            {
                ave.RegistroResultado = "Registrado";
                ave.RegistroObservacoes = "Registrado: dentro do padrão sem penalizações significativas.";
            }
            ave.RegistroResultado ??= "Registrado";
            ave.RegistroObservacoes ??= string.Empty;

            _ctx.Aves.Update(ave);
            await _ctx.SaveChangesAsync();
            return ave;
        }
    }
}