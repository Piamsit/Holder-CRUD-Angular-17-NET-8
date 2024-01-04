using Application.Common.Persistence;
using Application.Common.Validation;
using Application.Master.Holders.Dtos;
using Application.Master.Holders.Spec;
using Domain.Models.Master;
using FluentValidation;
using Mapster;
using MediatR;

namespace Application.Master.Holders;
public class CreateHolderRequest : IRequest<HolderDto>
{
    public string HolderNumber { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;

    public string Telephone { get; set; } = default!;
    public string Email { get; set; } = default!;
}

public class CreateHolderRequestValidator : CustomValidator<CreateHolderRequest>
{
    public CreateHolderRequestValidator(
        IReadRepository<Holder> holderRepo)
    {
        RuleFor(p => p.HolderNumber)
            .NotEmpty()
            .MaximumLength(50)
            .MustAsync(async (_, holderNumber, ct) =>
                    await holderRepo.FirstOrDefaultAsync(new HolderByNumberSpec(holderNumber), ct) is null)
                .WithMessage((_) => "Holder Number is already exist");

        RuleFor(p => p.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(p => p.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(p => p.Telephone)
            .NotEmpty()
            .MaximumLength(25);

        RuleFor(p => p.Email)
            .NotEmpty()
            .MaximumLength(100);
    }
}

public class CreateHolderRequestHandler : IRequestHandler<CreateHolderRequest, HolderDto>
{
    private readonly IRepository<Holder> _repository;

    public CreateHolderRequestHandler(
        IRepository<Holder> repository)
    {
        _repository = repository;
    }

    public async Task<HolderDto> Handle(CreateHolderRequest request, CancellationToken cancellationToken)
    {
        var holder = new Holder(
            request.HolderNumber,
            request.FirstName,
            request.LastName,
            request.Telephone,
            request.Email);

        await _repository.AddAsync(holder, cancellationToken);

        return holder.Adapt<HolderDto>();
    }
}
