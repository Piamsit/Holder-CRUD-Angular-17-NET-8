using Application.Common.Exceptions;
using Application.Common.Persistence;
using Application.Common.Validation;
using Application.Master.Holders.Dtos;
using Application.Master.Holders.Spec;
using Domain.Models.Master;
using FluentValidation;
using Mapster;
using MediatR;

namespace Application.Master.Holders;
public class UpdateHolderRequest : IRequest<HolderDto>
{
    public Guid Id { get; set; }

    public string HolderNumber { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;

    public string Telephone { get; set; } = default!;

    public string Email { get; set; } = default!;

}

public class UpdateHolderRequestValidator : CustomValidator<UpdateHolderRequest>
{
    public UpdateHolderRequestValidator(
        IReadRepository<Holder> holderRepo)
    {
        RuleFor(p => p.HolderNumber)
            .NotEmpty()
            .MustAsync(async (_, holderNumber, ct) =>
                await holderRepo.FirstOrDefaultAsync(new HolderByNumberSpec(holderNumber), ct)
                       is not Holder existingHolder ||
                       existingHolder.Id == _.Id)
               .WithMessage((_) => "Holder Number is already exist");

        RuleFor(p => p.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(p => p.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(p => p.Telephone)
            .MaximumLength(25);

        RuleFor(p => p.Email)
            .MaximumLength(100);
    }
}

public class UpdateHolderRequestHandler : IRequestHandler<UpdateHolderRequest, HolderDto>
{
    private readonly IRepository<Holder> _repository;

    public UpdateHolderRequestHandler(
        IRepository<Holder> repository)
    {
        _repository = repository;
    }

    public async Task<HolderDto> Handle(UpdateHolderRequest request, CancellationToken cancellationToken)
    {
        var holder = await _repository.GetByIdAsync(request.Id, cancellationToken);

        _ = holder ?? throw new NotFoundException("Holder Number not found");

        holder.Update(
            request.HolderNumber,
            request.FirstName,
            request.LastName,
            request.Telephone,
            request.Email);

        await _repository.UpdateAsync(holder, cancellationToken);

        return holder.Adapt<HolderDto>();
    }
}
