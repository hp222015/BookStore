import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl: string ="https://bookstore.incubation.bridgelabz.com"
  private authHeader = new HttpHeaders({
    'Accept':"application/json",
    Authorization: localStorage.getItem('token') ||""
  })

  constructor(public http: HttpClient) { }

  getBooks()
  {
    return this.http.get(`${this.baseUrl}/bookstore_user/get/book`);
  }

}

