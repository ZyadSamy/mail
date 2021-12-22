import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  signUpForm : FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
      birthDate: "",
    });
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

}
