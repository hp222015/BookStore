import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService:UserService, private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.isLoggedIn()) {
        return true; // User is authenticated, allow access
      } else {
        // User is not authenticated, redirect to login page
        return this.router.parseUrl('/login');
      }
    }
  }