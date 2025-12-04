using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BackupsController : ControllerBase
    {
        private readonly IBackupService _backupService;

        public BackupsController(IBackupService backupService)
        {
            _backupService = backupService;
        }

        // GET: api/Backups
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
          var lista = await _backupService.GetAllAsync();
          return Ok(lista);
        }

        // POST: api/Backups
        // Gera um novo backup
        [HttpPost]
        public async Task<IActionResult> Create([FromQuery] string? destinoPasta = null)
        {
            try
            {
                destinoPasta ??= Path.Combine(AppContext.BaseDirectory, "backups");

                if (!Directory.Exists(destinoPasta))
                    Directory.CreateDirectory(destinoPasta);

                var fileName = $"backup-{DateTime.UtcNow:yyyyMMdd-HHmmss}.db";
                var caminhoCompleto = Path.Combine(destinoPasta, fileName);

                Backup b = await _backupService.CreateBackupAsync(caminhoCompleto);
                return Ok(b);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
