using Ardalis.Specification;
using Domain.Models.Master;

namespace Application.Master.Holders.Spec;
public class HolderByNumberSpec : Specification<Holder>, ISingleResultSpecification<Holder>
{
    public HolderByNumberSpec(string holderNumber) =>
        Query.Where(b => b.HolderNumber == holderNumber);
}
