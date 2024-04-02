import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// interface VerificationData {
//   "token": string;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string ="https://bookstore.incubation.bridgelabz.com"
  // private authHeader = new HttpHeaders({
  //   'Accept':"application/json",
  //   Authorization: localStorage.getItem('token') ||""
  // })

  constructor(public http: HttpClient) {}

  registerUser(data:object)
  {
    return this.http.post(`${this.baseUrl}/bookstore_user/registration`,data)
  }
  loginUser(data:object)
  {
    return this.http.post(`${this.baseUrl}/bookstore_user/login`,data)
  }
  isLoggedIn(){
    if(localStorage.getItem('token'))
    {
      return true;
    }
    else
    return false;
  }
  // verifyUser(data:VerificationData)
  // {
  //   return this.http.post(`${this.baseUrl}/​bookstore_user​/verification​/${data.token}`,data);
  // }
}
