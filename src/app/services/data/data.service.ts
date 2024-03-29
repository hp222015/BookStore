import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private cartQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public cart$=this.cartQuantitySubject.asObservable();


  updateCartQuantity(quantity:number){    
    this.cartQuantitySubject.next(quantity);
  }


}
