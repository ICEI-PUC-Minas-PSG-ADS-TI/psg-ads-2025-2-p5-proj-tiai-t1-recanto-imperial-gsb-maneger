using System;
using System.ComponentModel.DataAnnotations;

namespace RecantoImperial.Api.Models
{
    public class Backup
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Caminho { get; set; }

        public DateTime Data { get; set; } = DateTime.UtcNow;
    }
}
