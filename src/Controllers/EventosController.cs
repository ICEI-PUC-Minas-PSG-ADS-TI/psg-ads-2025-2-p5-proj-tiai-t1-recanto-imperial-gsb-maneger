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
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _service;

        public EventosController(IEventoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventoDto dto)
        {
            try
            {
                var evento = new Evento
                {
                    AveId = dto.AveId,
                    TipoEvento = dto.TipoEvento,
                    Observacoes = dto.Observacoes,
                    Data = string.IsNullOrWhiteSpace(dto.Data) ? DateTime.UtcNow : DateTime.Parse(dto.Data)
                };

                var created = await _service.CreateAsync(evento);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (KeyNotFoundException) { return NotFound(); }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var e = await _service.GetByIdAsync(id);
            if (e == null) return NotFound();
            return Ok(e);
        }
    }
}
