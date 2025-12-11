namespace RecantoImperial.Api.Dtos
{
    public class PessoaGenealogicaDto
    {
        public int Id { get; set; }
        public string Anilha { get; set; }
        public string Nome { get; set; }
        public string Linhagem { get; set; }
        public string Sexo { get; set; }
    }

    public class GenealogiaDto
    {
        public PessoaGenealogicaDto Raiz { get; set; }

        public PessoaGenealogicaDto Pai { get; set; }
        public PessoaGenealogicaDto Mae { get; set; }

        public PessoaGenealogicaDto AvoPaterno { get; set; }
        public PessoaGenealogicaDto AvaPaterna { get; set; }

        public PessoaGenealogicaDto AvoMaterno { get; set; }
        public PessoaGenealogicaDto AvaMaterna { get; set; }
    }
}
