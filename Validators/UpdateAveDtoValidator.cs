using FluentValidation;
using RecantoImperial.Api.Dtos;

namespace RecantoImperial.Api.Validators
{
    public class UpdateAveDtoValidator : AbstractValidator<UpdateAveDto>
    {
        public UpdateAveDtoValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);

            RuleFor(x => x.Anilha)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.Nome)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Linhagem)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Sexo)
                .NotEmpty();

            RuleFor(x => x.DataNascimento)
                .NotEmpty();

            RuleFor(x => x.FotoPath)
                .MaximumLength(255);

            RuleFor(x => x.StatusDescricao)
                .MaximumLength(100);
        }
    }
}
