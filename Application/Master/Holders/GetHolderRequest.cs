using Application.Common.Exceptions;
using Application.Common.Persistence;
using Application.Master.Holders.Dtos;
using Domain.Models.Master;
using Mapster;
using MediatR;

namespace Application.Master.Holders;

public class GetHolderRequest : IRequest<HolderDto>
{
    public Guid Id { get; set; }

    public GetHolderRequest(Guid id)
    {
        Id = id;
    }
}

public class GetHolderRequestHandler : IRequestHandler<GetHolderRequest, HolderDto>
{
    private readonly IRepository<Holder> _repository;

    public GetHolderRequestHandler(
        IRepository<Holder> repository)
    {
        _repository = repository;
    }

    public async Task<HolderDto> Handle(GetHolderRequest request, CancellationToken cancellationToken)
    {
        var holder = await _repository.GetByIdAsync(request.Id, cancellationToken);
        _ = holder ?? throw new NotFoundException("Holder not found");

        return holder.Adapt<HolderDto>();
    }
}
