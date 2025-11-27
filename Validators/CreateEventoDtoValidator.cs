using FluentValidation;
using RecantoImperial.Api.Dtos;
using System;

namespace RecantoImperial.Api.Validators
{
    public class CreateEventoDtoValidator : AbstractValidator<CreateEventoDto>
    {
        public CreateEventoDtoValidator()
        {
            RuleFor(x => x.AveId).GreaterThan(0);
            RuleFor(x => x.TipoEvento).NotEmpty().WithMessage("TipoEvento é obrigatório.");
            RuleFor(x => x.Data).Must(BeAValidDate).When(x => !string.IsNullOrWhiteSpace(x.Data))
                .WithMessage("Data deve ser uma data válida.");
        }

        private bool BeAValidDate(string dateStr)
        {
            return DateTime.TryParse(dateStr, out _);
        }
    }
}
