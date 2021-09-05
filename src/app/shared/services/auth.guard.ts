import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean
        | UrlTree> | Promise<boolean | UrlTree>
        | boolean | UrlTree {

        if (!window.localStorage.getItem('user') || this.authService.tokenExpired(window.localStorage.getItem('user'))) {
            return this.router.createUrlTree(['/login']);
        }
        return true;
    }

}
