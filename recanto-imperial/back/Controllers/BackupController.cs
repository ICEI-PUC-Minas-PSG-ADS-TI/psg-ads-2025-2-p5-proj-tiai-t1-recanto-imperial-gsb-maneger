using Microsoft.AspNetCore.Mvc;
using RecantoImperial.Api.Services.Interfaces;
using RecantoImperial.Api.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BackupController : ControllerBase
    {
        private readonly IBackupService _backupService;

        public BackupController(IBackupService backupService)
        {
            _backupService = backupService;
        }

        // GET: api/Backup
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lista = await _backupService.GetAllAsync();
            return Ok(lista);
        }

        // POST: api/Backup
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            try
            {
                // Pasta "backups" dentro do diretório da aplicação
                string pasta = Path.Combine(AppContext.BaseDirectory, "backups");

                // Cria a pasta se não existir
                if (!Directory.Exists(pasta))
                    Directory.CreateDirectory(pasta);

                // Nome do arquivo ex: backup-20251211-143500.db
                string fileName = $"backup-{DateTime.Now:yyyyMMdd-HHmmss}.db";

                // Caminho final
                string destinoCompleto = Path.Combine(pasta, fileName);

                Backup b = await _backupService.CreateBackupAsync(destinoCompleto);

                return Ok(b);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
