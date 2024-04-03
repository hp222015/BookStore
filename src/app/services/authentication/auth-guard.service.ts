import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService { 

  constructor() { }
  gettokenforAuth(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("token");
    }
    return false;
  }
}

