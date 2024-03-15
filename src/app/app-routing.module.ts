import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const routes: Routes = [
  {
    path:"",
    component: SignupComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"home",
    component:HomeComponent,
    children: [
      {
        path: "bookInfo",
        component:BookInfoComponent
      },
      {
        path:"cart",
        component:CartComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"order",
        component:OrderComponent
      },
      {
        path:"wishlist",
        component:WishlistComponent
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
