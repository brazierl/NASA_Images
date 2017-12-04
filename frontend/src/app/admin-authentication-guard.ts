import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class AdminAuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    // Determine if a user is able to access an administration page
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isLoggedIn()
            .take(1)
            .map((isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    this.authenticationService.readProfile()
                        .take(1)
                        .map((user: User) => {
                            if (user.administrator) {
                                return true;
                            } else {
                                this.router.navigate(['/login']);
                                return false;
                            }
                        });
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            });
    }
}
