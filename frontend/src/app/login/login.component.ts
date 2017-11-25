import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private error: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  onSubmit(loginForm: NgForm) {
    this.authenticationService.login(loginForm.value)
      .subscribe(
      (data) => {
        console.log(data);
        this.authenticationService.saveToken(data['token']);
        this.router.navigate(['images']);
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
      );
  }

  ngOnInit() {
  }

  handleError(err: HttpErrorResponse) {
    this.error = 'Registration failed: ' + err.message;
    return this.authenticationService.handleError('register', []);
  }
}
