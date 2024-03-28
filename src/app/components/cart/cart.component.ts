import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

interface bookObj {
  "bookName":string,
  "author":string,
  "quantity": number,
  "price": number,
  "discountPrice":number
}


interface cartDetailsObj{
  "product_id":bookObj,
  "quantityToBuy": number,
  "_id":string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  bookQuantity:number=0;
  cartBookList:bookObj[]=[];
  cartDetails:cartDetailsObj[]=[];

  constructor( public bookService:BookService){

  }

  ngOnInit(): void {
    this.bookService.getCartBooks().subscribe((result:any)=>{
    console.log(result);
    this.cartDetails=result.result;  
    this.cartDetails.forEach((details:cartDetailsObj)=>{
      this.cartBookList.push(details.product_id);
      console.log(this.cartBookList);
    })
    },
    (error)=>{console.log(error)});
    
  }


  reduceBook(value:number){
    if(value>0)
    {
      value-=1;
      this.bookQuantity=value;
    }
  }

  incrementBook(value:number,avbl:number){
    if(value< avbl){
      value+=1;
      this.bookQuantity=value;
    }
  }
}
