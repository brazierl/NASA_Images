import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  loggedIn$ = this.authenticationService.isLoggedIn();

  constructor(private authenticationService: AuthenticationService, private location: Location) { }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authenticationService.login(loginForm.value)
        .subscribe(
        (data) => {
          this.authenticationService.saveToken(data['token']);
          this.location.back();
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
        );
    } else {
      this.error = 'The form is not valid!';
    }
  }

  ngOnInit() {
  }

  handleError(err: HttpErrorResponse) {
    this.error = 'Authentication failed: ' + err.message;
    return this.authenticationService.handleError('login', []);
  }

  logout() {
    this.authenticationService.logout();
  }
}
