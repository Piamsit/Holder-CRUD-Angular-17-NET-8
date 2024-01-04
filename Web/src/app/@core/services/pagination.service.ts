import { Injectable } from '@angular/core';
import { PaginationFilter } from '@core/models/base';
import { LazyLoadEvent } from 'primeng/api';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private readonly isLoading = new Subject<boolean>();
  readonly isLoading$ = this.isLoading.asObservable();

  search = new Subject<PaginationFilter>();
  export = new Subject<PaginationFilter>();

  nested: Map<string, string>;

  setLoading(val: boolean) {
    this.isLoading.next(val);
  }

  loadPage(event: LazyLoadEvent) {
    const currentPage =
      (event.first / event.rows < 0 ? event.first : event.first / event.rows) +
      1;
    let search: PaginationFilter = {
      orderBy: this.buildSort(event),
      pageNumber: currentPage,
      pageSize: event.rows,
      keyword: event.globalFilter ? event.globalFilter : null,
    };

    if (event.filters) {
      Object.entries(event.filters).map(([key, objVal]) => {
        search[key] = objVal.value;
      });
    }
    this.search.next(search);
  }

  exportPage(event: LazyLoadEvent, selected = false) {
    let search: PaginationFilter = {
      orderBy: this.buildSort(event),
      keyword: event.globalFilter ? event.globalFilter : null,
    };

    if (selected) {
      if (event.filters) {
        Object.entries(event.filters).map(([key, objVal]) => {
          search[key] = objVal.value;
        });
      }
      search.selected = selected;
    }
    this.export.next(search);
  }

  private buildSort(event: LazyLoadEvent): string[] {
    if (event.sortField) {
      let sortBy = event.sortField;
      if (event.sortOrder < 0) {
        sortBy = `${sortBy} Descending`;
      } else {
        sortBy = `${sortBy} Ascending`;
      }
      return [sortBy];
    }
    return [];
  }
}
