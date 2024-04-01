import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';


interface bookObj {
  "bookName":string,
  "author":string,
  "quantity": number,
  "price": number,
  "discountPrice":number,
  "_id":string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit { 

  bookList:bookObj[]=[];
  currentPage: number =1;
  itemsPerPage: number=8;
  sorted: string='';

  constructor(public bookService: BookService, public router:Router){}

  ngOnInit(): void {
       this.getBooks();
  }

  sortIncreasingPrice(){
    this.sorted='low_to_high';
    this.getBooks();
  }

  sortDecreasingPrice(){
    this.sorted='high_to_low';
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe((result:any)=>
    {
      this.bookList=result.result;
      if(this.sorted==='low_to_high'){
        this.bookList.sort((a, b) => a.discountPrice - b.discountPrice);
      }
      else if(this.sorted==='high_to_low'){
        this.bookList.sort((a, b) => b.discountPrice - a.discountPrice);
      }

    },
    (error)=>{console.log(error);});
  }

  get startIndex(): number{
    return (this.currentPage -1)*this.itemsPerPage;
  }
  get endIndex(): number{
    return Math.min(
      this.startIndex + this.itemsPerPage -1,
      this.bookList.length -1
    );
  }
  get totalPages(): number {
    return Math.ceil(this.bookList.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  navigateToBook(id: string){
    this.router.navigate(["/home/bookInfo",id]);
  }

  get pagedBookList(): bookObj[] {
    return this.bookList.slice(this.startIndex, this.endIndex + 1);
  }

  onPageChange(pageNumber:number):void{
    this.currentPage =pageNumber;
  }

  
}
