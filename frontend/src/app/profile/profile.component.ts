import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User;
  private error: string;

  constructor(private authenticataionService: AuthenticationService) { }

  ngOnInit() {
    this.authenticataionService.readProfile().subscribe((user) => {
      this.user = user;
    },
      (err: HttpErrorResponse) => {
        this.error = 'Error loading the profile: ' + err.message;
      });
  }

}
