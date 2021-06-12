import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {}

    //get and check token to authorize
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //get the token
        const authToken = this.userService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        //handle method on next request
        return next.handle(authRequest);
    }

}