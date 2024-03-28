import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';


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
  bookQuantity: number=0;
  quantity: number=0;
 

  constructor(public bookService:BookService, private route:ActivatedRoute , public router:Router){}
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
      }});
    this.bookService.getFeedback(idParam).subscribe((result:any)=>{
        this.reviewList=result.result;
    });
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
    this.cartState=true;
    if(this.book._id){
      this.bookService.postToCart(this.book._id).subscribe((result)=>{console.log(result);},
        (error)=>{console.log(error);})
    }
  }

  reduceBook(){
    if(this.bookQuantity>0)
    {
      this.bookQuantity-=1;
    }
  }

  incrementBook(){
    if(this.bookQuantity<this.quantity){
      this.bookQuantity+=1;
    }
  }
  sendBookQuantity(){

  }
}
