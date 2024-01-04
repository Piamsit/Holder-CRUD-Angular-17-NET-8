using Application.Common.Interfaces;

namespace Application.Master.Holders.Dtos;
public class HolderDto : IDto
{
    public Guid Id { get; set; }
    public string HolderNumber { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string FullName => FirstName + " " + LastName;

    public string Telephone { get; set; } = default!;
    public string Email { get; set; } = default!;
}
