﻿using Application.Common.Persistence;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Domain.Common.Contracts;
using Infrastructure.Persistence.Context;
using Mapster;

namespace Infrastructure.Persistence.Repository;

public class ApplicationDbRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T>
    where T : class, IAggregateRoot
{
    public ApplicationDbRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
    }

    protected override IQueryable<TResult> ApplySpecification<TResult>(ISpecification<T, TResult> specification) =>
        specification.Selector is not null
            ? base.ApplySpecification(specification)
            : ApplySpecification(specification, false)
                .ProjectToType<TResult>();
}