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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private error: string;
  private sucess: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  onSubmit(registerForm: NgForm) {
    const user = new User();
    user.firstname = registerForm.value.firstname;
    user.lastname = registerForm.value.lastname;
    user.email = registerForm.value.email;
    user.username = registerForm.value.username;
    user.password = registerForm.value.password;
    console.log(user);
    this.authenticationService.register(user)
      .subscribe(
        (data) => {
          console.log(data);
          this.authenticationService.saveToken(data['token']);
          this.sucess = true;
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
