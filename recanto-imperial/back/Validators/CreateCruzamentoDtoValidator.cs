using System.Collections.Generic;
using System.Linq;
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
                .Must(a => a.Count >= 3).WithMessage("Um cruzamento deve conter, no mínimo, Pai, Mãe e pelo menos um Filho.");

            RuleFor(x => x.Aves)
                .Must(TemUmPai).WithMessage("O cruzamento deve ter exatamente um 'Pai'.")
                .Must(TemUmaMae).WithMessage("O cruzamento deve ter exatamente uma 'Mae'.")
                .Must(TemFilho).WithMessage("O cruzamento deve ter pelo menos um 'Filho'.");

            RuleForEach(x => x.Aves).SetValidator(new CruzamentoAveItemDtoValidator());
        }

        private bool TemUmPai(List<CruzamentoAveItemDto> aves)
            => aves.Count(a => a.Papel == "Pai") == 1;

        private bool TemUmaMae(List<CruzamentoAveItemDto> aves)
            => aves.Count(a => a.Papel == "Mae") == 1;

        private bool TemFilho(List<CruzamentoAveItemDto> aves)
            => aves.Any(a => a.Papel == "Filho");
    }

    public class CruzamentoAveItemDtoValidator : AbstractValidator<CruzamentoAveItemDto>
    {
        public CruzamentoAveItemDtoValidator()
        {
            RuleFor(x => x.AveId)
                .GreaterThan(0);

            RuleFor(x => x.Papel)
                .NotEmpty()
                .Must(p => p == "Pai" || p == "Mae" || p == "Filho")
                .WithMessage("Papel deve ser 'Pai', 'Mae' ou 'Filho'.");
        }
    }
}
