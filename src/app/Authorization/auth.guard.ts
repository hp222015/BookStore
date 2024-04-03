import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/authentication/auth-guard.service';

@Injectable({providedIn:'root'})

export class authGuard implements CanActivate{
  constructor(private auth:AuthGuardService,private route:Router){}
  canActivate(): boolean  {
    if(! this.auth.gettokenforAuth()){
      this.route.navigateByUrl("");
    }
    return this.auth.gettokenforAuth()
  }

}