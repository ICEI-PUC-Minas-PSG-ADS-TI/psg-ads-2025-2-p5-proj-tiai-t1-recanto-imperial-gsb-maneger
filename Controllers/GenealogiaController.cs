using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Services.Interfaces;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenealogiaController : ControllerBase
    {
        private readonly IGenealogiaService _service;

        public GenealogiaController(IGenealogiaService service)
        {
            _service = service;
        }

        [HttpGet("por-ave/{id:int}")]
        public async Task<IActionResult> GetPorAveId(int id)
        {
            var arvore = await _service.MontarPorAveIdAsync(id);
            if (arvore == null) return NotFound();
            return Ok(arvore);
        }

        [HttpGet("por-anilha/{anilha}")]
        public async Task<IActionResult> GetPorAnilha(string anilha)
        {
            var arvore = await _service.MontarPorAnilhaAsync(anilha);
            if (arvore == null) return NotFound();
            return Ok(arvore);
        }
    }
}
