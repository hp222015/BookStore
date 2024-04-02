import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface DetailsElement{
  email: string,
  contact: number,
  address: string
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  
  displayedColumns: string[] = ['email','contact','address']
  dataSource = ELEMENT_DETAILS;


  constructor(public router:Router){}
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
const ELEMENT_DETAILS:DetailsElement[]=[
  {
    email:'harshitpawar80@gmail.com',
    contact:8630410176,
    address:'20 DholiPyau, Motikunj, Mathura'
  }
]
