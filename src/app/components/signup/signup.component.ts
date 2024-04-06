import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  LoginForm !: FormGroup;
  RegisterForm !: FormGroup;
  submittedRegister: boolean= false; 
  submittedLogin: boolean=false;  
  key:string="";
  switch:boolean=true;

constructor(private formBuilder:FormBuilder, public userService:UserService, public router:Router){  
  
}

ngOnInit():void{  
  this.LoginForm=this.formBuilder.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]]
  });

   this.RegisterForm=this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      pswd:["",[Validators.required,Validators.minLength(6)]],
      mno:["",[Validators.required,Validators.minLength(10)]]
    });
}
get fl(){
  return this.LoginForm.controls;
}

get fr(){
  return this.RegisterForm.controls;
}



loginUser(){
  this.submittedLogin=true;
  if(this.LoginForm.invalid){
    return;
  }
  
  const {email,password}=this.LoginForm.value;
  this.userService.loginUser({
  "email": email,
  "password": password
  }).subscribe((data:any)=>{
    console.log(data);
    localStorage.setItem("token",data.result.accessToken);
    this.router.navigate(["/dashboard"]);
    // this.userService.verifyUser({"token":data.result.accessToken}).subscribe((result)=>{console.log(result);},
    // (error)=>{console.log(error);});
  },
  (error)=>{console.log(error);});
}
  
resetForms(selectedIndex: number) {
  if (selectedIndex === 0) { // Login tab
    this.LoginForm.reset();
    this.submittedLogin = false;
  } else if (selectedIndex === 1) { // Signup tab
    this.RegisterForm.reset();
    this.submittedRegister = false;
  }
}

registerUser(){
  this.submittedRegister=true;
  if(this.RegisterForm.invalid){
    return;
  }

  const {name,email,pswd,mno} = this.RegisterForm.value;
  let details={
      "fullName": name,
      "email": email,
      "password":pswd,
      "phone": mno
  }
  this.userService.registerUser(details).subscribe((result)=>{
    console.log(result);
  },
  (error)=>{console.log(error);});
  console.log(this.RegisterForm.value);
  }
}
