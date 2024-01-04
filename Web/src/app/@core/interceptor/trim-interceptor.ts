import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TrimInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ตรวจสอบว่าเป็น HTTP POST หรือไม่
    if (req.method === 'POST' || req.method === 'PUT') {
      // ทำการ clone คำขอและ trim ข้อมูลใหม่
      const trimmedData = this.trimRequestData(req);
      req = req.clone({ body: trimmedData });
      return next.handle(req);
    }

    // ส่งคำขอต่อไปในกรณีอื่น ๆ
    return next.handle(req);
  }

  private trimRequestData(request: HttpRequest<any>): any {
    // ตรวจสอบว่า request มี body หรือไม่
    if (!request.body) {
      return null;
    }

    // กำหนดค่าใหม่ของ body โดยทำ trim ข้อความที่อยู่ใน object
    const trimmedBody = this.trimObjectProperties(request.body);

    return trimmedBody;
  }

  private trimObjectProperties(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      // กรณีเป็น array ให้ทำการ trim ใน elements แต่ละตัว
      return obj.map((element) => this.trimObjectProperties(element));
    }

    // กรณีเป็น object ให้ทำการ trim ใน properties แต่ละตัว
    const trimmedObject = {};
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === 'string') {
        trimmedObject[key] = value.trim();
      } else {
        trimmedObject[key] = value;
      }
    }

    return trimmedObject;
  }
}
