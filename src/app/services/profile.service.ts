import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,
    @Inject('apiurl') private ApiUrl) { }

  getProfile() {
    return this.http.get('/api/user/me');
  }
}
