import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

interface cartObj
{
  "quantityToBuy":number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookQuantity:number=0;
  cartDetails:cartObj[]=[];

  constructor(public router:Router, public bookService:BookService){
  }

  ngOnInit(): void {
    this.getbookQuantity();
  }
  gotoLogin(){
    this.router.navigate([""]);
  }
  gotoCart()
  {
    this.router.navigate(['/home/cart']);
  }
  getbookQuantity(){
    this.bookService.getCartBooks().subscribe((result:any)=>{
        this.cartDetails=result.result;
        this.cartDetails.forEach((detail)=>{this.bookQuantity+=detail.quantityToBuy});
    },
    (error)=>{console.log(error);});
  }
}
// use event emitter and update the value  so that needn't refresh