using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CruzamentosController : ControllerBase
    {
        private readonly ICruzamentoService _service;

        public CruzamentosController(ICruzamentoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cruzamento>>> Get()
        {
            var lista = await _service.ListarAsync();
            return Ok(lista);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Cruzamento>> GetById(int id)
        {
            var cruz = await _service.ObterPorIdAsync(id);
            if (cruz == null) return NotFound();
            return Ok(cruz);
        }

        [HttpPost]
        public async Task<ActionResult<Cruzamento>> Post([FromBody] CreateCruzamentoDto dto)
        {
            var cruz = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = cruz.Id }, cruz);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.ExcluirAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
