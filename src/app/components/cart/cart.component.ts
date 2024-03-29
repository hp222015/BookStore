import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

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
  cartValue:number=0;
  count:number=0;

  constructor( public bookService:BookService, public router:Router, public dataService:DataService){}

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

  reduceBook(value:number,id:string,i:number){
    if(value>1)
     {value--;}
    this.sendBookQuantity(value,id);
    this.updateQuantityToBuyList(value,i);
    
  }

  incrementBook(value:number,avbl:number,id:string,i:number)
  {
    if(value<avbl)
      {value++;}
    else if(value===avbl)
    {
      window.alert("Quantity Reached");
    }
    this.sendBookQuantity(value,id);
    this.updateQuantityToBuyList(value,i);
    
  }

  sendBookQuantity(value: number, id:string){
    const obj={
      "quantityToBuy":value
    }
    this.bookService.updateCartQuantity(id,obj).subscribe((result)=>{console.log(result);},
    (error)=>{console.log(error);});
  }

  updateQuantityToBuyList(value:number,index:number){
    this.quantityToBuyList[index]=value;
    this.cartValue = this.quantityToBuyList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
      }, 0);
    this.dataService.updateCartQuantity(this.cartValue);
  }

  removeBook(id:string,index:number){
    this.bookService.removeBook(id).subscribe((result)=>{console.log(result);
    this.cartBookList.splice(index, 1);
    this.quantityToBuyList.splice(index, 1);
    this.cartValue = this.quantityToBuyList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
      }, 0);
    this.dataService.updateCartQuantity(this.cartValue);
  },
    (error)=>{console.log(error);}
    ); 
    
  }

  goToHome(){
    this.router.navigate(['/dashboard']);
  }
  checkout(){
    this.router.navigate(['/home/order']);
  }
}
