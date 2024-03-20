import { Component,OnInit } from '@angular/core';
import { BookService} from 'src/app/services/book.service';

interface bookObj {
  "bookName":string,
  "author":string,
  "quantity": number,
  "price": number,
  "discountPrice":number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit { 

  bookList:bookObj[]=[];

  constructor(public bookService: BookService){}

  ngOnInit(): void {
       this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe((result:any)=>
    {
      this.bookList=result.result;
      console.log(this.bookList);
    },
    (error)=>{console.log(error);});
  }
}
