import { AuthGuard } from './auth-guard.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: AuthService) { 
        super(auth)
    }
    

    canActivate() {
       var isAuthenticated = super.canActivate();
       if(isAuthenticated)
            return this.auth.isInRole('Admin');
            
        return false;
    }
}