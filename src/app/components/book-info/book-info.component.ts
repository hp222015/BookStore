import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { DataService } from 'src/app/services/data/data.service';


interface bookDetails {
  "bookName"?:string,
  "author"?:string,
  "quantity"?: number,
  "price"?: number,
  "discountPrice"?:number,
  "_id"?:string
}
interface userId{
  "_id":string,
  "fullName":string
}
interface reviewObj{
  "user_id":userId,
  "rating":number,
  "comment":string  
}
interface cartDetailsObj{
  "product_id":bookDetails,
  "quantityToBuy": number,
  "_id":string
}


@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {
  book:bookDetails={};
  reviewList: reviewObj[]=[];
  value: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  comment: string='';
  cartState: boolean=false;
  bookQuantityInCart: number=0;
  quantity: number=0;
  cartItem: cartDetailsObj[]=[];
  cartItemId: string='';
 

  constructor(public bookService:BookService, private route:ActivatedRoute , public router:Router, public dataService:DataService){}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if(idParam !==null)
    {
    this.bookService.getBooks().subscribe((result:any)=>{      
      for (let item of result.result)
      {
        if(item._id==idParam)
        {
          this.book=item;
          this.quantity=item.quantity;
          console.log(item);
        }
      }
    this.getCartItems();
    },
      (error)=>{console.log(error);});
    this.bookService.getFeedback(idParam).subscribe((result:any)=>{
        this.reviewList=result.result;
    },
    (error)=>{console.log(error);});

    }
  }
  
  goHome(){
    this.router.navigate(['/dashboard']);
  }
  setValue(star: number): void {
    this.value = star;
  }
  sendFeedback(){
    
    const feedback={
      "comment":this.comment,
      "rating":this.value.toString()
    };
    console.log(feedback);
    
    if(this.book._id){
    this.bookService.postFeedback(this.book._id,feedback).subscribe((response)=>{console.log('Feedback posted successfully',response);
    this.getFeedback();},
    (error)=>{console.log(error);});
    }
    this.value=0;
    this.comment='';
  }
  getFeedback(){
    if(this.book._id)
    {
      this.bookService.getFeedback(this.book._id).subscribe((result:any)=>{
          this.reviewList=result.result;
      });
    }
  }

  
  addToCart(){

    if(this.book._id && this.bookQuantityInCart===0){
      this.bookQuantityInCart+=1;
      
      this.bookService.postToCart(this.book._id).subscribe((result:any)=>{        
        
        console.log(result);
        this.cartItemId=result.result._id;
        this.sendBookQuantity();
        this.cartState=true;
      },
        (error)=>{console.log(error);})
    }
  }
  
  getCartItems(){
    this.bookService.getCartBooks().subscribe((result:any)=>{
      this.cartItem=result.result;
      this.cartItem.forEach((item)=>{
        if(item.product_id._id===this.book._id)
         {
          console.log("Book Present in Cart");
          this.cartState=true;
          this.bookQuantityInCart=item.quantityToBuy;
          console.log(`Book Quantity In Cart ${this.bookQuantityInCart}`);
          this.cartItemId=item._id;
        }
        else{
          console.log("Book not in cart");
          this.cartState=false;
          this.bookQuantityInCart=0;
        }
      });
    
    },
    (error)=>{console.log(error);});
  }

  reduceBook(){
    if(this.bookQuantityInCart>1)
    {
      this.bookQuantityInCart-=1;
      this.sendBookQuantity();
    }
   
  }

  incrementBook(){
    if(this.bookQuantityInCart<this.quantity){
      this.bookQuantityInCart+=1;
    }
    else if(this.bookQuantityInCart===this.quantity)
    {
      window.alert("Quantity Reached");
    }
    this.sendBookQuantity();
  }
 
  sendBookQuantity(){   
    if(this.cartItemId)
    {      
      const obj1={
        "quantityToBuy": this.bookQuantityInCart
      }
    this.bookService.updateCartQuantity(this.cartItemId,obj1).subscribe((result)=>{
      console.log(result);
    },
    (error)=>{console.log(error);});    
    
    }
  }


}


