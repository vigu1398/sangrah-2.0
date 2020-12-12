import { Injectable, Injector, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    public injector: Injector,
    @Inject('apiurl') private ApiUrl,
    public authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    request = request.clone({
      url: this.ApiUrl + request.url,
      setParams: {
        access_token: authService.getToken()
      }
    });
    return next.handle(request).pipe(
      // shareReplay(1),
      tap(
        response => {
          if (response['status'] === 401) {
            this.authService.logout();
          }
        },
        error => {
          //console.error(error);
        }
      )
    );
  }
}
