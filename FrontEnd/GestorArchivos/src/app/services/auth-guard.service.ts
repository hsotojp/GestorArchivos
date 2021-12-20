import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(): boolean {
    const canActivated = this.auth.isAuthenticated();
    if (canActivated) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }
  canActivateChild(): boolean {
    const canActivated = this.auth.isAuthenticated();
    if (canActivated) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
