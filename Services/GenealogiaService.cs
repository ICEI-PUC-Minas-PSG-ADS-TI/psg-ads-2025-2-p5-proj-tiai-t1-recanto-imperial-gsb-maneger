using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;

namespace RecantoImperial.Api.Services
{
	public class GenealogiaService : IGenealogiaService
	{
		private readonly AppDbContext _ctx;

		public GenealogiaService(AppDbContext ctx)
		{
			_ctx = ctx;
		}

		public async Task<GenealogiaDto> MontarPorAnilhaAsync(string anilha)
		{
			var ave = await _ctx.Aves.AsNoTracking()
				.FirstOrDefaultAsync(a => a.Anilha == anilha);

			if (ave == null)
				return null;

			return await MontarPorAveIdAsync(ave.Id);
		}

		public async Task<GenealogiaDto> MontarPorAveIdAsync(int aveId)
		{
			var raiz = await _ctx.Aves.AsNoTracking()
				.FirstOrDefaultAsync(a => a.Id == aveId);

			if (raiz == null)
				return null;

			var result = new GenealogiaDto
			{
				Raiz = MapPessoa(raiz)
			};

			var cruzamentoRaiz = await _ctx.Cruzamentos
				.Include(c => c.CruzamentoAves)
					.ThenInclude(ca => ca.Ave)
				.AsNoTracking()
				.FirstOrDefaultAsync(c =>
					c.CruzamentoAves.Any(ca => ca.AveId == aveId && ca.Papel == "Filho"));

			if (cruzamentoRaiz != null)
			{
				var pai = cruzamentoRaiz.CruzamentoAves
					.FirstOrDefault(ca => ca.Papel == "Pai")?.Ave;
				var mae = cruzamentoRaiz.CruzamentoAves
					.FirstOrDefault(ca => ca.Papel == "Mae")?.Ave;

				result.Pai = MapPessoa(pai);
				result.Mae = MapPessoa(mae);

				if (pai != null)
				{
					var cruzPaiFilho = await _ctx.Cruzamentos
						.Include(c => c.CruzamentoAves)
							.ThenInclude(ca => ca.Ave)
						.AsNoTracking()
						.FirstOrDefaultAsync(c =>
							c.CruzamentoAves.Any(ca => ca.AveId == pai.Id && ca.Papel == "Filho"));

					if (cruzPaiFilho != null)
					{
						var avoP = cruzPaiFilho.CruzamentoAves
							.FirstOrDefault(ca => ca.Papel == "Pai")?.Ave;
						var avaP = cruzPaiFilho.CruzamentoAves
							.FirstOrDefault(ca => ca.Papel == "Mae")?.Ave;

						result.AvoPaterno = MapPessoa(avoP);
						result.AvaPaterna = MapPessoa(avaP);
					}
				}

				if (mae != null)
				{
					var cruzMaeFilho = await _ctx.Cruzamentos
						.Include(c => c.CruzamentoAves)
							.ThenInclude(ca => ca.Ave)
						.AsNoTracking()
						.FirstOrDefaultAsync(c =>
							c.CruzamentoAves.Any(ca => ca.AveId == mae.Id && ca.Papel == "Filho"));

					if (cruzMaeFilho != null)
					{
						var avoM = cruzMaeFilho.CruzamentoAves
							.FirstOrDefault(ca => ca.Papel == "Pai")?.Ave;
						var avaM = cruzMaeFilho.CruzamentoAves
							.FirstOrDefault(ca => ca.Papel == "Mae")?.Ave;

						result.AvoMaterno = MapPessoa(avoM);
						result.AvaMaterna = MapPessoa(avaM);
					}
				}
			}

			return result;
		}

		private static PessoaGenealogicaDto MapPessoa(Ave ave)
		{
			if (ave == null) return null;

			return new PessoaGenealogicaDto
			{
				Id = ave.Id,
				Anilha = ave.Anilha,
				Nome = ave.Nome,
				Linhagem = ave.Linhagem,
				Sexo = ave.Sexo.ToString()
			};
		}
	}
}
