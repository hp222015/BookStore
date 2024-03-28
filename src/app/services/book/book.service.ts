import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  baseUrl: string ="https://bookstore.incubation.bridgelabz.com/bookstore_user"
  private authHeader = new HttpHeaders({
    'Accept':"application/json",
    token: localStorage.getItem('token') ||""
  })
    

  constructor(public http: HttpClient) {}

  

  getBooks()
  {
    return this.http.get(`${this.baseUrl}/get/book`);
  }

  postFeedback(id:string,data:any){    
    return this.http.post(`${this.baseUrl}/add/feedback/${id}`,data,{headers: this.authHeader});
  }

  getFeedback(id:string){
    return this.http.get(`${this.baseUrl}/get/feedback/${id}`,{headers: this.authHeader});
  }
  
  postToCart(id:string){
    return this.http.post(`${this.baseUrl}/add_cart_item/${id}`,{},{headers: this.authHeader});
  }
  getCartBooks(){
    return this.http.get(`${this.baseUrl}/get_cart_items`,{headers:this.authHeader});
  }
}

