using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public class Cruzamento
    {
        [Key]
        public int Id { get; set; }

        public DateTime Data { get; set; } = DateTime.UtcNow;

        public string Observacoes { get; set; }

        public ICollection<CruzamentoAves> CruzamentoAves { get; set; }
    }

    public class CruzamentoAves
    {
        public int CruzamentoId { get; set; }
        public Cruzamento Cruzamento { get; set; }

        public int AveId { get; set; }
        public Ave Ave { get; set; }

        [MaxLength(50)]
        public string Papel { get; set; }
    }
}
