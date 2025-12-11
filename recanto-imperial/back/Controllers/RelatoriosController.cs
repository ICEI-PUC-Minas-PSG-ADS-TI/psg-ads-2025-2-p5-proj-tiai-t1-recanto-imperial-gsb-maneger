using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly IRelatorioService _service;

        public RelatoriosController(IRelatorioService service)
        {
            _service = service;
        }

        [HttpPost("ficha-ave/{aveId:int}")]
        public async Task<IActionResult> GerarFichaAve(int aveId, [FromQuery] string? destinoPasta = null)
        {
            destinoPasta ??= Path.Combine(AppContext.BaseDirectory, "relatorios");
            try
            {
                var rel = await _service.GerarFichaAvePdfAsync(aveId, destinoPasta);
                return Ok(new { caminho = rel.CaminhoArquivo, id = rel.Id });
            }
            catch (KeyNotFoundException) { return NotFound(); }
            catch (Exception ex) { return BadRequest(new { error = ex.Message }); }
        }
    }
}
