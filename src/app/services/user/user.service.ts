import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string ="https://bookstore.incubation.bridgelabz.com"

  constructor(public http: HttpClient) {}

  registerUser(data:object)
  {
    return this.http.post(`${this.baseUrl}/bookstore_user/registration`,data)
  }
  loginUser(data:object)
  {
    return this.http.post(`${this.baseUrl}/bookstore_user/login`,data)
  }
}
