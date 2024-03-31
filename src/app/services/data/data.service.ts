import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private cartQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private bookInfoQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cart$=this.cartQuantitySubject.asObservable();
  public  book$= this.bookInfoQuantitySubject.asObservable();


  updateCartQuantity(quantity:number){    
    this.cartQuantitySubject.next(quantity);
  }
  updateBookInfoQuantity(quantity:number){
    this.bookInfoQuantitySubject.next(quantity);
  }

}
