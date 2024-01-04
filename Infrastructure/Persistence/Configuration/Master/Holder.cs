using Domain.Models.Master;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration.Master;
public class HolderConfig : IEntityTypeConfiguration<Holder>
{
    public void Configure(EntityTypeBuilder<Holder> builder)
    {
        builder.ToTable(nameof(Holder).ToUpper());

        builder.Property(x => x.HolderNumber).HasMaxLength(10).IsRequired();
        builder.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
        builder.Property(x => x.LastName).HasMaxLength(100).IsRequired();
        builder.Property(x => x.Telephone).HasMaxLength(20).IsRequired();
        builder.Property(x => x.Email).HasMaxLength(100).IsRequired();

        builder.HasIndex(x => x.HolderNumber);
    }
}