import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private registerUrl = '/api/register';
  private loginUrl = '/api/login';

  constructor(private http: HttpClient) { }

  saveToken(token) {
    localStorage['jwt-token'] = token;
  }

  getToken() {
    return localStorage['jwt-token'];
  }

  logout() {
    localStorage.removeItem('jwt-token');
  }

  isLoggedIn() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  currentUser() {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      let payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      return {
        email: payload.email,
        name: payload.name
      };
    }
  }

  register(user) {
    return this.http.post(this.registerUrl, user);
  }

  login(user) {
    return this.http.post(this.loginUrl, user);
  }

  handleError (operation = 'operation', result?) {
    return (error: any) => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  log(message: string) {
    console.log('Authentication Service: ' + message);
  }

}
