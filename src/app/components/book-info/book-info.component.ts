import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { BookService } from 'src/app/services/book/book.service';

interface bookDetails {
  "bookName"?:string,
  "author"?:string,
  "quantity"?: number,
  "price"?: number,
  "discountPrice"?:number,
  "_id"?:string
}

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {
  book:bookDetails={};
  value: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  comment: string='';

  constructor(public dataService:DataService, public router:Router, public bookService:BookService){}
  ngOnInit(): void {
    this.dataService.bDetails$.subscribe((details:bookDetails)=>
    {
      this.book=details;
    },
    (error)=>{console.log(error);});
  }
  goHome(){
    this.router.navigate(['/dashboard']);
  }
  setValue(star: number): void {
    this.value = star;
  }
  sendFeedback(){
    console.log(this.comment);
    const feedback={
      "comment":this.comment,
      "rating": this.value
    };
    if(this.book._id){
      console.log(this.book._id);
    this.bookService.postFeedback(this.book._id,feedback);
    }
  }
}
