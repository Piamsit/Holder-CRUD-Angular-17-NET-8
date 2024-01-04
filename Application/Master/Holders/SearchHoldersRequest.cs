using Application.Common.Models;
using Application.Common.Persistence;
using Application.Common.Specification;
using Application.Master.Holders.Dtos;
using Ardalis.Specification;
using Domain.Models.Master;
using MediatR;

namespace Application.Master.Holders;
public class SearchHoldersRequest : PaginationFilter, IRequest<PaginationResponse<HolderDto>>
{

}

public class HoldersBySearchRequestSpec : EntitiesByPaginationFilterSpec<Holder, HolderDto>
{
    public HoldersBySearchRequestSpec(SearchHoldersRequest request)
        : base(request) =>
        Query.OrderBy(c => c.HolderNumber, !request.HasOrderBy());
}

public class SearchHoldersRequestHandler : IRequestHandler<SearchHoldersRequest, PaginationResponse<HolderDto>>
{
    private readonly IReadRepository<Holder> _repository;

    public SearchHoldersRequestHandler(
        IReadRepository<Holder> repository)
    {
        _repository = repository;
    }

    public async Task<PaginationResponse<HolderDto>> Handle(SearchHoldersRequest request, CancellationToken cancellationToken)
    {
        var spec = new HoldersBySearchRequestSpec(request);
        return await _repository.PaginatedListAsync(spec, request.PageNumber, request.PageSize, cancellationToken);
    }
}
