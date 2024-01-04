export interface PaginationFilter extends BaseFilter {
  orderBy?: string[];
  pageNumber?: number;
  pageSize?: number;

  selected?: boolean;
}

interface BaseFilter {
  advancedSearch?: Search;
  advancedFilter?: Filter;
  keyword?: string;
}

interface Search {
  fields?: string[];
}

interface Filter {
  logic?: string;
  filters?: Filter[];
  field?: string;
  operator?: string;
  value?: string;
}

export const FilterOperator = {
  EQ: 'eq',
  NEQ: 'neq',
  LT: 'lt',
  LTE: 'lte',
  GT: 'gt',
  GTE: 'gte',
  STARTSWITH: 'startswith',
  ENDSWITH: 'endswith',
  CONTAINS: 'contains',
};

export const FilterLogic = {
  AND: 'and',
  OR: 'or',
  XOR: 'xor',
};
