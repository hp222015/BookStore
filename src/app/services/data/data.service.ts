import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

interface bookDetails{
  "bookName"?:string,
  "author"?:string,
  "quantity"?: number,
  "price"?: number,
  "discountPrice"?:number,
  "_id"?:string
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  public bDetailsSubject: BehaviorSubject<bookDetails> = new BehaviorSubject<bookDetails>({});
  public bDetails$ = this.bDetailsSubject.asObservable();

  constructor() { }

  setDetails(bDetails:bookDetails){
    this.bDetailsSubject.next(bDetails);
  }
}
