using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvesController : ControllerBase
    {
        private readonly IAveService _aveService;
        private readonly IEventoService _eventoService;
        private readonly IMapper _mapper;

        public AvesController(
            IAveService aveService,
            IEventoService eventoService,
            IMapper mapper)
        {
            _aveService = aveService;
            _eventoService = eventoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var aves = await _aveService.GetAllAsync();
            return Ok(_mapper.Map<AveDto[]>(aves));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var ave = await _aveService.GetByIdAsync(id);
            if (ave == null) return NotFound();
            return Ok(_mapper.Map<AveDto>(ave));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAveDto dto)
        {
            try
            {
                var ave = _mapper.Map<Ave>(dto);
                var created = await _aveService.CreateAsync(ave);

                var evento = new Evento
                {
                    AveId = created.Id,
                    TipoEvento = "Nascimento",
                    Observacoes = "Ave cadastrada no sistema.",
                    Data = DateTime.UtcNow
                };

                await _eventoService.CreateAsync(evento);

                return CreatedAtAction(nameof(Get), new { id = created.Id }, _mapper.Map<AveDto>(created));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAveDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Id da URL e Id do corpo não conferem.");

            var existing = await _aveService.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            existing.Anilha = dto.Anilha;
            existing.Nome = dto.Nome;
            existing.Linhagem = dto.Linhagem;
            existing.Peso = dto.Peso;
            existing.Sexo = dto.Sexo == "Macho" ? Sexo.Macho : Sexo.Femea;

            if (!string.IsNullOrWhiteSpace(dto.DataNascimento))
                existing.DataNascimento = DateTime.Parse(dto.DataNascimento);

            if (!string.IsNullOrWhiteSpace(dto.StatusDescricao))
                existing.StatusDescricao = dto.StatusDescricao;

            var updated = await _aveService.UpdateAsync(existing);

            return Ok(_mapper.Map<AveDto>(updated));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _aveService.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
