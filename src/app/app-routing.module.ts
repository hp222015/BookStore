import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';


const routes: Routes = [  
  
  {
    path:"",
    component: SignupComponent
  },

  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"home",
    component:HomeComponent,
    children: [
      {
        path: "bookInfo/:id",
        component:BookInfoComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:"cart",
        component:CartComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:"profile",
        component:ProfileComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:"order",
        component:OrderComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:"wishlist",
        component:WishlistComponent,
        canActivate:[AuthGuardService]
      }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
