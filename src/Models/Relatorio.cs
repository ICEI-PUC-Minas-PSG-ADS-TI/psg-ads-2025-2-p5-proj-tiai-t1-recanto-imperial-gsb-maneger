using System;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public class Relatorio
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Tipo { get; set; }

        public DateTime DataGeracao { get; set; } = DateTime.UtcNow;

        [MaxLength(255)]
        public string CaminhoArquivo { get; set; }
    }
}
