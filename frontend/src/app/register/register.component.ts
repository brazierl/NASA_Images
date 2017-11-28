import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    if (registerForm.valid) {
      this.authenticationService.register(registerForm.value)
        .subscribe(
        (data) => {
          this.authenticationService.saveToken(data['token']);
          this.sucess = true;
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
        );
    }else {
      this.error = 'The form is not valid!';
    }
  }

  ngOnInit() {
  }

  handleError(err: HttpErrorResponse) {
    this.error = 'Registration failed: ' + err.message;
    return this.authenticationService.handleError('register', []);
  }
}
