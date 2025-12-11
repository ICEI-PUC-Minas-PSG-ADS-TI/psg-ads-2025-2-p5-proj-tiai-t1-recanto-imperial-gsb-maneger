using System;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public class Evento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AveId { get; set; }
        public Ave Ave { get; set; }

        [Required]
        [MaxLength(100)]
        public string TipoEvento { get; set; }

        public DateTime Data { get; set; } = DateTime.UtcNow;

        public string Observacoes { get; set; }
    }
}
