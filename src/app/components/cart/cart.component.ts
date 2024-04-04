import { Component,OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { SearchService } from 'src/app/services/search/search.service';

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
  filteredCartBookList:bookObj[]=[];
  cartDetails:cartDetailsObj[]=[];
  quantityToBuyList:number[]=[];
  cartValue:number=0;
  count:number=0;
  isExpanded:boolean=false;
  isOrderExpanded:boolean=false;
  selectedAddressType: string ='';
  AddressForm !: FormGroup;
  totalPrice: number=0;


  constructor( public bookService:BookService, public router:Router, public dataService:DataService, private formBuilder:FormBuilder,
    public searchService:SearchService){
    this.AddressForm=this.formBuilder.group({
      name:["",Validators.required],
      phNo:["",Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      state:["",Validators.required],
      addressType:["",Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCartItems();    
    this.subscribeSearchQuery();
  }
  
  
  expandAddressPanel():void{
    this.isExpanded=true;
  }

  addressTypeChanged(event: any) {
    this.selectedAddressType = event.value;
  }

  subscribeSearchQuery():void{
    
    this.searchService.searchQuery$.subscribe((query)=>{
      if(query.trim() !=='')
      {
      this.filteredCartBookList=this.cartBookList.filter(book=>
      book.bookName.toLowerCase().includes(query.toLowerCase())
      ||book.author.toLowerCase().includes(query.toLowerCase()));
      }
      else{
       this.filteredCartBookList=[...this.cartBookList];
      }
     },
     (error)=>{console.log(error);});
  }

  getCartItems(){
    this.bookService.getCartBooks().subscribe((result:any)=>{
    console.log(result);
    this.cartDetails=result.result;  
    this.cartDetails.forEach((details:cartDetailsObj)=>{
      this.cartBookList.push(details.product_id);
      this.quantityToBuyList.push(details.quantityToBuy);
    });
    
    this.filteredCartBookList = this.cartBookList;
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

  addAddress(){
    this.isOrderExpanded=true;
  }

  
}
