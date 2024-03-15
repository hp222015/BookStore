import { Component} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  RegisterForm !: FormGroup

  constructor(private formBuilder:FormBuilder){
    this.RegisterForm=this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(3)]]
      email:["",[Validators.required,Validators.email]]
      pswd:["",[Validators.required,Validators.minLength(6)]]
      mno:["",[Validators.required,Validators.minLength(10)]]
    });
  }
registerUser(){

}
}
