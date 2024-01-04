using Application.Common.Models;
using Application.Master.Holders;
using Application.Master.Holders.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.Master;

public class HoldersController : BaseApiController
{
    [HttpPost("search")]
    public async Task<PaginationResponse<HolderDto>> SearchAsync(SearchHoldersRequest request)
    {
        return await Mediator.Send(request);
    }

    [HttpGet("{id:guid}")]
    public async Task<HolderDto> GetAsync(Guid id)
    {
        return await Mediator.Send(new GetHolderRequest(id));
    }

    [HttpPost]
    public async Task<HolderDto> CreateAsync(CreateHolderRequest request)
    {
        return await Mediator.Send(request);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<HolderDto>> UpdateAsync(UpdateHolderRequest request, Guid id)
    {
        return id != request.Id
            ? BadRequest()
            : Ok(await Mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    public async Task<Guid> DeleteAsync(Guid id)
    {
        return await Mediator.Send(new DeleteHolderRequest(id));
    }
}