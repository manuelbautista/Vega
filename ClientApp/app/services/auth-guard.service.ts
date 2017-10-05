import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: AuthService) { }
    

    canActivate() {
        if(this.auth.isAuthenticated()){
            return true;
        }
       var login = document.getElementById("login")
        if(login)
            login.click();
        return false;
    }
}