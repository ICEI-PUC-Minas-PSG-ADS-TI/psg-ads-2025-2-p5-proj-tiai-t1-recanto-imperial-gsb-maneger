using AutoMapper;
using RecantoImperial.Api.Dtos;
using RecantoImperial.Api.Models;
using System;

namespace RecantoImperial.Api.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateAveDto, Ave>()
                .ForMember(dest => dest.DataNascimento,
                           opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.DataNascimento) ? (DateTime?)null : DateTime.Parse(src.DataNascimento)))
                .ForMember(dest => dest.Sexo,
                           opt => opt.MapFrom(src => src.Sexo == "Macho" ? Sexo.Macho : Sexo.Femea))
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<UpdateAveDto, Ave>()
                .ForMember(dest => dest.DataNascimento,
                           opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.DataNascimento) ? (DateTime?)null : DateTime.Parse(src.DataNascimento)))
                .ForMember(dest => dest.Sexo,
                           opt => opt.MapFrom(src => src.Sexo == "Macho" ? Sexo.Macho : Sexo.Femea));

            CreateMap<Ave, AveDto>()
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo.ToString()))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DataNascimento.HasValue ? src.DataNascimento.Value.ToString("yyyy-MM-dd") : null));
        }
    }
}
