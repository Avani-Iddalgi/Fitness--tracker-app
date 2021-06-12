import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | import("@angular/router").UrlTree 
           | import("rxjs").Observable<boolean 
           | import("@angular/router").UrlTree> 
           | Promise<boolean | import("@angular/router").UrlTree> {
               const isAuthenticated = this.userService.getIsAuthenticated();
               if (!isAuthenticated) {
                   this.router.navigate(['']);
               }
               return isAuthenticated;
    }
    
}