import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

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

  constructor(public dataService:DataService, public router:Router){}
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
}
