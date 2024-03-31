import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';

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

  constructor(public router:Router, public bookService:BookService, public dataService:DataService){
  }

  ngOnInit(): void {
    this.getbookQuantity();
    this.updatebookQuantity();
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
        this.bookQuantity = this.cartDetails.reduce((total, detail) => total + detail.quantityToBuy, 0);
      },
    (error)=>{console.log(error);});
  }
  updatebookQuantity(){
    this.dataService.cart$.subscribe((result)=>{this.bookQuantity=result;},
    (error)=>{console.log(error);});
    this.dataService.book$.subscribe((value)=>{this.bookQuantity+=value;},
    (error)=>{console.log(error);});
  }
}
