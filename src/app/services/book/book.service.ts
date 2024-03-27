import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  baseUrl: string ="https://bookstore.incubation.bridgelabz.com"
  // private authHeader = new HttpHeaders({
  //   'Accept':"application/json",
  //   Authorization: localStorage.getItem('token') ||""
  // })
  token:any = localStorage.getItem('token');
    

  constructor(public http: HttpClient) {}

  

  getBooks()
  {
    return this.http.get(`${this.baseUrl}/bookstore_user/get/book`);
  }

  postFeedback(id:string,data:any){    
    let httpHeadersOption={
      headers: new HttpHeaders({
        contentType: 'application/json',
        token: this.token,
      }),
    };
    return this.http.post(`${this.baseUrl}/bookstore_user/add/feedback/${id}`,data,true && httpHeadersOption);
  }

  getFeedback(id:string){  
    let httpHeadersOption={
      headers: new HttpHeaders({
        contentType: 'application/json',
        token: this.token,
      }),
    };  
    return this.http.get(`${this.baseUrl}/bookstore_user/get/feedback/${id}`,true && httpHeadersOption);
  }

}

