using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Data;
using RecantoImperial.Api.Models;
using RecantoImperial.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace RecantoImperial.Api.Services
{
    public class BackupService : IBackupService
    {
        private readonly AppDbContext _ctx;
        private readonly string _baseDir;

        public BackupService(AppDbContext ctx)
        {
            _ctx = ctx;
            _baseDir = AppContext.BaseDirectory;
        }

        public async Task<Backup> CreateBackupAsync(string destinoCompleto)
        {
            var dbFile = Path.Combine(_baseDir, "recanto.db");
            if (!File.Exists(dbFile))
                throw new FileNotFoundException("Arquivo do banco não encontrado para backup.", dbFile);

            File.Copy(dbFile, destinoCompleto, overwrite: true);

            var b = new Backup { Caminho = destinoCompleto, Data = DateTime.UtcNow };
            await _ctx.Backups.AddAsync(b);
            await _ctx.SaveChangesAsync();
            return b;
        }

        public async Task<IEnumerable<Backup>> GetAllAsync()
        {
            return await _ctx.Backups.AsNoTracking().ToListAsync();
        }
    }
}
