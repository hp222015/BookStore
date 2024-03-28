import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bookQuantity:number=0;
  constructor(public router:Router, public dataService:DataService){
  }
  gotoLogin(){
    this.router.navigate([""]);
  }
  gotoCart()
  {
    this.router.navigate(['/home/cart'])
  }
}
