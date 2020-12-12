import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { RequestCacheService } from '../../services/request-cache.service';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ENABLE_API_CACHING } from '../../url.config';

@Injectable()
export class CachingInterceptorService implements HttpInterceptor {
  constructor(private cache: RequestCacheService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(req);
    return cachedResponse && ENABLE_API_CACHING
      ? of(cachedResponse)
      : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && ENABLE_API_CACHING)
          cache.put(req, event);
      })
    );
  }
}
