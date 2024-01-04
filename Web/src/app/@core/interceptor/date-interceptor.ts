import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updatedBody = this.updateDateProperties(req.body);
    req = req.clone({ body: updatedBody });

    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && event.body) {
          this.convertStringDatesToDate(event.body);
        }
        return event;
      })
    );
  }

  private updateDateProperties(body: any): any {
    if (body && body instanceof Object) {
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          const property = body[key];
          if (property instanceof Date) {
            const updatedDate = this.addHoursToDate(property, 7);
            body[key] = updatedDate;
          } else if (property instanceof Object) {
            this.updateDateProperties(property);
          }
        }
      }
    }
    return body;
  }

  private addHoursToDate(date: Date, hours: number): Date {
    const updatedDate = new Date(new Date(date));
    updatedDate.setHours(updatedDate.getHours() + hours);
    return updatedDate;
  }

  private convertStringDatesToDate(body: any): void {
    if (body && body instanceof Object) {
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (
            typeof body[key] === 'string' &&
            this.isValidDateString(body[key])
          ) {
            const dateString = body[key];
            const dateValue = new Date(dateString.substring(0, 19));
            body[key] = dateValue;
          } else if (body[key] instanceof Object) {
            this.convertStringDatesToDate(body[key]);
          }
        }
      }
    }
  }

  private isValidDateString(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    return regex.test(dateString);
  }
}
