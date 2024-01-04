import { Injectable } from '@angular/core';
import { PagedResult, PaginationFilter } from '@core/models/base';
import { Holder } from '@core/models/master';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class HolderService {
  private apiController = `holders`;

  constructor(private apiService: ApiService) {}

  search(request: PaginationFilter): Observable<PagedResult> {
    return this.apiService.post(`${this.apiController}/search`, {
      ...request,
    });
  }

  getById(holderId: string): Observable<Holder> {
    return this.apiService.get(`${this.apiController}/${holderId}`);
  }

  add(holder: Holder | Partial<Holder>): Observable<Holder> {
    return this.apiService.post(`${this.apiController}`, {
      ...holder,
    });
  }

  update(holder: Holder | Partial<Holder>): Observable<Holder> {
    return this.apiService.put(`${this.apiController}/${holder.id}`, {
      ...holder,
    });
  }

  delete(holderId: string) {
    return this.apiService.delete(`${this.apiController}/${holderId}`);
  }
}
