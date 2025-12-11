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
        public async Task<IActionResult> GetAll()
        {
            var lista = await _service.GetAllAsync();
            return Ok(lista);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

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
                    Data = string.IsNullOrWhiteSpace(dto.Data)
                        ? DateTime.UtcNow
                        : DateTime.Parse(dto.Data)
                };

                var criado = await _service.CreateAsync(evento);
                return Ok(criado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
