using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public enum Sexo
    {
        Macho,
        Femea
    }

    public enum StatusAve
    {
        Ativa,
        Vendida,
        Falecida,
        Inativa
    }

    public class Ave
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Anilha { get; set; }

        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(100)]
        public string Linhagem { get; set; }

        public Sexo Sexo { get; set; } = Sexo.Femea;

        public DateTime? DataNascimento { get; set; }

        public decimal? Peso { get; set; }

        [MaxLength(50)]
        public string StatusDescricao { get; set; }

        public StatusAve Status { get; set; } = StatusAve.Ativa;

        [MaxLength(50)]
        public string CorBico { get; set; }
        [MaxLength(50)]
        public string Canelas { get; set; }
        [MaxLength(50)]
        public string PlumagemPattern { get; set; }
        public string Caracteristicas { get; set; }

        public int AuriculaPoints { get; set; }
        public int CristaPoints { get; set; }
        public int BarbelaPoints { get; set; }
        public int PontosTotais { get; set; }

        public string RegistroResultado { get; set; }

        public string FotoPath { get; set; }

        public ICollection<Evento> Eventos { get; set; }
        public ICollection<CruzamentoAves> CruzamentoAves { get; set; }
    }
}
