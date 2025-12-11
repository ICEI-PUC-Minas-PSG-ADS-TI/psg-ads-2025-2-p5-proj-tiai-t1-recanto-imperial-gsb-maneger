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
        private readonly IMapper _mapper;

        public AvesController(IAveService aveService, IMapper mapper)
        {
            _aveService = aveService;
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

        [HttpGet("by-anilha/{anilha}")]
        public async Task<IActionResult> GetByAnilha(string anilha)
        {
            var ave = await _aveService.GetByAnilhaAsync(anilha);
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
                return CreatedAtAction(nameof(Get), new { id = created.Id }, _mapper.Map<AveDto>(created));
            }
            catch (InvalidOperationException ex) { return BadRequest(new { error = ex.Message }); }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAveDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Id da URL e Id do corpo não conferem.");

            try
            {
                var existing = await _aveService.GetByIdAsync(id);
                if (existing == null)
                    return NotFound();

                existing.Anilha = dto.Anilha;
                existing.Nome = dto.Nome;
                existing.Linhagem = dto.Linhagem;

                existing.Sexo = dto.Sexo == "Macho"
                    ? Sexo.Macho
                    : Sexo.Femea;

                existing.DataNascimento = string.IsNullOrWhiteSpace(dto.DataNascimento)
                    ? null
                    : DateTime.Parse(dto.DataNascimento);

                existing.Peso = dto.Peso;

                if (!string.IsNullOrWhiteSpace(dto.FotoPath))
                    existing.FotoPath = dto.FotoPath;

                if (!string.IsNullOrWhiteSpace(dto.StatusDescricao))
                    existing.StatusDescricao = dto.StatusDescricao;

                var updated = await _aveService.UpdateAsync(existing);
                var resultDto = _mapper.Map<AveDto>(updated);

                return Ok(resultDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
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
