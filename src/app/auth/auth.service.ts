import { environment } from './../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('apiurl') private ApiUrl
  ) { }

  isLoggedIn() {
    return this.http.get('/api/user/isAuthenticated/');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return JSON.parse(userStr);
  }

  authenticate(userCredentials: any) {
    return this.http.post('/api/auth/local', userCredentials);
  }

  getMe() {
    return this.http.get('/api/user/me/');
  }

  authorizeToken(token) {
    return this.http.post('/api/user/authorizeToken/' + token, {});
  }

  hasRole(roleRequired) {
    const roleArray = [
      'enumerator',
      'supervisor',
      'admin',
      'superadmin'
    ];
    const userRole = this.getCurrentUser().role;
    return roleArray.indexOf(userRole) >= roleArray.indexOf(roleRequired)
      ? true
      : false;
  }

}
