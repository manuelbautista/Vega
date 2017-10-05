// src/app/auth/auth.service.ts
import { JwtHelper } from 'angular2-jwt';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'hdrkrFPykPVZ25POZTVcUMZ74GJ0w37d',
    domain: 'vegaproyecto.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.vega.com',
    redirectUri: 'http://localhost:5000/callback',      
    scope: 'openid profile email'
  });

  constructor(public router: Router) {}

  public isInRole(roleName: any) {
    var roles = localStorage.getItem('roles')
    
    if(!roles)
      return false;
    
    return roles.indexOf(roleName) > -1;
  }
  public getProfile(cb:any): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

    // ...
    public handleAuthentication(): void {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          
          var jwtHelper = new JwtHelper();
          var decodedToken = jwtHelper.decodeToken(authResult.accessToken)
          var roles = decodedToken['https://vega.com/roles']
          //set roles user to cache
          localStorage.setItem('roles', roles);

          this.router.navigate(['/home']);
        } else if (err) {
          this.router.navigate(['/home']);
          console.log(err);
        }
      });
  }
    private setSession(authResult: any): void {
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      //token para el JWT
      localStorage.setItem('token', authResult.accessToken);
    }
  
    public logout(): void {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      //token para el JWT
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('roles');
      // Go back to the home route
      this.router.navigate(['/']);
    }
  
    public isAuthenticated(): boolean {
      // Check whether the current time is past the
      // access token's expiry time
      var expireAtString = localStorage.getItem('expires_at');
      if(expireAtString)
        var expiresAt = JSON.parse(expireAtString);
        
      return new Date().getTime() < expiresAt;
    }

  public login(): void {

    this.auth0.authorize({
      clientID: 'hdrkrFPykPVZ25POZTVcUMZ74GJ0w37d',
      domain: 'vegaproyecto.auth0.com',
      responseType: 'token id_token',
      audience: 'https://api.vega.com',
      redirectUri: 'http://localhost:5000/callback',      
      scope: 'openid profile email',
    });
  }

}