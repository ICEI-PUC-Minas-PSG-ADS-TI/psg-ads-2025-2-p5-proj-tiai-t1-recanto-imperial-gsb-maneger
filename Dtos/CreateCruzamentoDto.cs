using System.Collections.Generic;

namespace RecantoImperial.Api.Dtos
{
    public class CreateCruzamentoDto
    {
        public string Observacoes { get; set; }
        public List<CruzamentoAveItemDto> Aves { get; set; }
    }

    public class CruzamentoAveItemDto
    {
        public int AveId { get; set; }
        public string Papel { get; set; }
    }
}
