import { StorageService } from 'src/app/services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, switchMap } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private storageService: StorageService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from(this.storageService.get('token'))
      .pipe(
        switchMap((token) => {
          if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
          }
          if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          }
          return next.handle(request);
        })
      );
    }
  }