import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { of } from 'rxjs/observable/of';
import { User } from './user';

@Injectable()
export class AuthenticationService {

  private registerUrl = '/api/register';
  private loginUrl = '/api/login';

  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) { }

  saveToken(token) {
    localStorage['jwt-token'] = token;
    this.loggedIn.next(true);
    this.updateUser();
  }

  getToken() {
    return localStorage['jwt-token'];
  }

  logout() {
    localStorage.removeItem('jwt-token');
    this.loggedIn.next(false);
    this.updateUser();
  }

  isLoggedIn() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      const res = payload.exp > Date.now() / 1000;
      this.loggedIn.next(res);
      return this.loggedIn.asObservable();
    } else {
      this.loggedIn.next(false);
      return this.loggedIn.asObservable();
    }
  }

  updateUser() {
    const user = new User();
    if (this.loggedIn.getValue && this.getToken()) {
      const token = this.getToken();
      let payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      user._id = payload._id;
      user.email = payload.email;
      user.username = payload.username;
    }

    this.user.next(user);
  }

  getUser() {
    this.updateUser();
    return this.user.asObservable();
  }

  register(user) {
    return this.http.post(this.registerUrl, user);
  }

  login(user) {
    return this.http.post(this.loginUrl, user);
  }

  handleError(operation = 'operation', result?) {
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
