import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge =
  1000 * //1 second
  60 * //1 minute
  10; // 10 minutes
@Injectable()
export class RequestCacheService {
  cache = new Map();
  constructor() {}

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    let key = req.urlWithParams;
    if (req.body) {
      key = key + JSON.stringify(req.body);
    }
    const cached = this.cache.get(key);
    if (!cached || req.method === 'GET') {
      return undefined;
    }
    const isExpired = cached.lastRead < Date.now() - maxAge;
    // const expired = isExpired ? 'expired ' : '';
    // console.log(`Found ${expired}cached response for "${url}".`);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    let key = req.urlWithParams;
    const url = key;
    if (req.body) {
      key = key + JSON.stringify(req.body);
    }
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(key, entry);

    //Remove expired cached entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
