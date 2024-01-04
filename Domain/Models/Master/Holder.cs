using Domain.Common.Contracts;

namespace Domain.Models.Master
{
    public class Holder : AuditableEntity, IAggregateRoot
    {
        public string HolderNumber { get; private set; } = default!;
        public string FirstName { get; private set; } = default!;
        public string LastName { get; private set; } = default!;
        public string Telephone { get; private set; } = default!;
        public string Email { get; private set; } = default!;

        public Holder(
            string holderNumber,
            string firstName,
            string lastName,
            string telephone,
            string email)
        {
            HolderNumber = holderNumber;
            FirstName = firstName;
            LastName = lastName;
            Telephone = telephone;
            Email = email;
        }

        public Holder Update(
            string holderNumber,
            string firstName,
            string lastName,
            string telephone,
            string email)
        {
            HolderNumber = holderNumber;
            FirstName = firstName;
            LastName = lastName;
            Telephone = telephone;
            Email = email;

            return this;
        }
    }
}
