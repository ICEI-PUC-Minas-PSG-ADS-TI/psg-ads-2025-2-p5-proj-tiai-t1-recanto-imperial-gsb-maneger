using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public enum Sexo
    {
        Macho = 0,
        Femea = 1
    }

    public enum StatusAve
    {
        Ativa = 0,
        Vendida = 1,
        Falecida = 2
    }

    public class Ave
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Anilha { get; set; }

        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(100)]
        public string Linhagem { get; set; }

        public Sexo Sexo { get; set; } = Sexo.Femea;

        public DateTime? DataNascimento { get; set; }
        public int? Idade { get; set; }
        public decimal? Peso { get; set; }

        public StatusAve Status { get; set; } = StatusAve.Ativa;

        [MaxLength(50)]
        public string CorBico { get; set; }

        [MaxLength(50)]
        public string Canelas { get; set; }

        [MaxLength(50)]
        public string PlumagemPattern { get; set; }

        public string Caracteristicas { get; set; }

        public byte AuriculaDespigPercent { get; set; }

        public string CristaTombamento { get; set; } = "Nenhuma";

        public decimal BarbelaDesigualdadePercent { get; set; }

        public bool PlumagemBarrada { get; set; }
        public bool PlumagemFrisada { get; set; }
        public bool PlumagemCarijo { get; set; }
        public bool PescocoPelado { get; set; }
        public bool Barbuda { get; set; }
        public bool OlhosVermelhos { get; set; }

        public int AuriculaPoints { get; set; }
        public int CristaPoints { get; set; }
        public int BarbelaPoints { get; set; }
        public int PontosTotais { get; set; }

        public string RegistroResultado { get; set; } = "N/A";

        public string RegistroObservacoes { get; set; } = string.Empty;

        public string FotoPath { get; set; } = string.Empty;
        public string StatusDescricao { get; set; } = string.Empty;

        public ICollection<Evento> Eventos { get; set; } = new List<Evento>();
        public ICollection<CruzamentoAves> CruzamentoAves { get; set; } = new List<CruzamentoAves>();

        public int? PaiId { get; set; }
        public Ave? Pai { get; set; }
        public int? MaeId { get; set; }
        public Ave? Mae { get; set; }

    }
}
