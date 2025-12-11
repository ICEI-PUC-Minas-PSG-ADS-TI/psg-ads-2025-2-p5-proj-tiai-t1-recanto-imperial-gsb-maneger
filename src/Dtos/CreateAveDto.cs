namespace RecantoImperial.Api.Dtos
{
    public class CreateAveDto
    {
        public string Anilha { get; set; }
        public string Nome { get; set; }
        public string Linhagem { get; set; }
        public string Sexo { get; set; }
        public string DataNascimento { get; set; }
        public decimal? Peso { get; set; }
        public string FotoPath { get; set; }
    }
}
