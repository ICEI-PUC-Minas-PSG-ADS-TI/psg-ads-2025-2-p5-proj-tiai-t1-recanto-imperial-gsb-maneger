using FluentValidation;
using RecantoImperial.Api.Dtos;
using System;

namespace RecantoImperial.Api.Validators
{
    public class CreateAveDtoValidator : AbstractValidator<CreateAveDto>
    {
        public CreateAveDtoValidator()
        {
            RuleFor(x => x.Anilha)
                .NotEmpty().WithMessage("Anilha é obrigatória.")
                .MaximumLength(50);

            RuleFor(x => x.Nome).MaximumLength(100);
            RuleFor(x => x.Linhagem).MaximumLength(100);

            RuleFor(x => x.Sexo)
                .NotEmpty().WithMessage("Sexo é obrigatório.")
                .Must(s => s == "Macho" || s == "Femea")
                .WithMessage("Sexo deverá ser 'Macho' ou 'Femea'.");

            RuleFor(x => x.DataNascimento)
                .Must(BeAValidDate).When(x => !string.IsNullOrWhiteSpace(x.DataNascimento))
                .WithMessage("DataNascimento deve ser uma data ISO válida (yyyy-MM-dd).");

            RuleFor(x => x.Peso)
                .GreaterThan(0).When(x => x.Peso.HasValue);
        }

        private bool BeAValidDate(string dateStr)
        {
            return DateTime.TryParse(dateStr, out _);
        }
    }
}
