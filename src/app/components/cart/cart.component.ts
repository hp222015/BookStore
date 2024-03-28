import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Router } from '@angular/router';

interface bookObj {
  "bookName":string,
  "author":string,
  "quantity": number,
  "price": number,
  "discountPrice":number,
  "_id":string
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
  quantityToBuyList:number[]=[];

  constructor( public bookService:BookService, public router:Router){

  }

  ngOnInit(): void {
    this.getCartItems();    
  }
  
  getCartItems(){
    this.bookService.getCartBooks().subscribe((result:any)=>{
    console.log(result);
    this.cartDetails=result.result;  
    this.cartDetails.forEach((details:cartDetailsObj)=>{
      this.cartBookList.push(details.product_id);
      this.quantityToBuyList.push(details.quantityToBuy);
    })
    },
    (error)=>{console.log(error)});
  }

  reduceBook(value:number){
    if(value>0)
     value--;
  }

  incrementBook(value:number,avbl:number)
  {
    if(value<avbl)
      value++;
  }

  // sendBookQuantity(){
    
  //   this.bookService.getCartBooks().subscribe((result:any)=>{
  //     this.cartItem=result.result;
  //     this.cartItem.forEach((item)=>{if(item.product_id._id==this.book._id)
  //        {
  //         if(item._id)
  //         {this.cartItemId=item._id;}
  //       }});
  //       console.log(this.cartItemId);
  //   },
  //   (error)=>{console.log(error);});

    
    
  //   if(this.cartItemId)
  //   {
  //     const obj1={
  //       "quantityToBuy": this.bookQuantity
  //     }
  //   this.bookService.updateCartQuantity(this.cartItemId,obj1).subscribe((result)=>{
  //     console.log(result);
  //     console.log('successful');
  //   },
  //   (error)=>{console.log(error);});
  //   }
  // }

  removeBook(id:string,bookId:string){
    this.bookService.removeBook(id).subscribe((result)=>{console.log(result);
    this.updateCartItems(bookId);},
    (error)=>{console.log(error);}
    );  
  }
  updateCartItems(bookId:string){
    this.cartBookList=this.cartBookList.filter((book)=>{book._id!==bookId});
    this.getCartItems();      
  }
  goToHome(){
    this.router.navigate(['/dashboard']);
  }
  checkout(){
    this.router.navigate(['/home/order']);
  }
}
