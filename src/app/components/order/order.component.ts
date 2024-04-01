import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  constructor(public router:Router){

  }
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
