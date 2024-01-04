using Application.Common.Exceptions;
using Application.Common.Persistence;
using Application.Common.Validation;
using Domain.Models.Master;
using MediatR;

namespace Application.Master.Holders;
public class DeleteHolderRequest : IRequest<Guid>
{
    public Guid Id { get; set; }

    public DeleteHolderRequest(Guid id)
    {
        Id = id;
    }
}

public class DeleteHolderRequestValidator : CustomValidator<DeleteHolderRequest>
{
    public DeleteHolderRequestValidator()
    {

    }
}

public class DeleteHolderRequestHandler : IRequestHandler<DeleteHolderRequest, Guid>
{
    private readonly IRepository<Holder> _repository;

    public DeleteHolderRequestHandler(
        IRepository<Holder> repository)
    {
        _repository = repository;
    }

    public async Task<Guid> Handle(DeleteHolderRequest request, CancellationToken cancellationToken)
    {
        var holder = await _repository.GetByIdAsync(request.Id, cancellationToken);

        _ = holder ?? throw new NotFoundException("Holder not found");

        await _repository.DeleteAsync(holder, cancellationToken);

        return request.Id;
    }
}