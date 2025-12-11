using Microsoft.EntityFrameworkCore;
using RecantoImperial.Api.Models;

namespace RecantoImperial.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<Ave> Aves { get; set; }
        public DbSet<Cruzamento> Cruzamentos { get; set; }
        public DbSet<CruzamentoAves> CruzamentoAves { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Relatorio> Relatorios { get; set; }
        public DbSet<Backup> Backups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ave>()
                .HasIndex(a => a.Anilha)
                .IsUnique();

            modelBuilder.Entity<CruzamentoAves>()
                .HasKey(ca => new { ca.CruzamentoId, ca.AveId });

            modelBuilder.Entity<CruzamentoAves>()
                .HasOne(ca => ca.Cruzamento)
                .WithMany(c => c.CruzamentoAves)
                .HasForeignKey(ca => ca.CruzamentoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CruzamentoAves>()
                .HasOne(ca => ca.Ave)
                .WithMany(a => a.CruzamentoAves)
                .HasForeignKey(ca => ca.AveId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.Ave)
                .WithMany(a => a.Eventos)
                .HasForeignKey(e => e.AveId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
