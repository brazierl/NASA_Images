import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Image Collections';
  loggedIn$ = this.authenticationService.isLoggedIn();
  currentUser$ = this.authenticationService.getUser();

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logout();
  }
}
