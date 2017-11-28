import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isLoggedIn()
            .take(1)
            .map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            });
    }
}
