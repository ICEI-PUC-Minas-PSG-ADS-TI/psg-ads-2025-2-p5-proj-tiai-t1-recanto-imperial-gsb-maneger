using FluentValidation;
using RecantoImperial.Api.Dtos;

namespace RecantoImperial.Api.Validators
{
    public class CreateCruzamentoDtoValidator : AbstractValidator<CreateCruzamentoDto>
    {
        public CreateCruzamentoDtoValidator()
        {
            RuleFor(x => x.Aves)
                .NotNull().WithMessage("A lista de aves é obrigatória.")
                .Must(a => a.Count >= 2).WithMessage("Um cruzamento deve conter pelo menos duas aves.");

            RuleForEach(x => x.Aves).SetValidator(new CruzamentoAveItemDtoValidator());
        }
    }

    public class CruzamentoAveItemDtoValidator : AbstractValidator<CruzamentoAveItemDto>
    {
        public CruzamentoAveItemDtoValidator()
        {
            RuleFor(x => x.AveId).GreaterThan(0);
            RuleFor(x => x.Papel).NotEmpty().Must(p => p == "Pai" || p == "Mae").WithMessage("Papel deve ser 'Pai' ou 'Mae'.");
        }
    }
}
