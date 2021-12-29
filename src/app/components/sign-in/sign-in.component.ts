import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  @Output() signInEmitter = new EventEmitter();

  loginForm: FormGroup;

  constructor(
    private accountService : AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  gotoSignup() {
    // Redirect
    this.router.navigate(['signup']);
  }

  onSignin() {
    // Validate credentials
    const email : string = this.email.value;
    const password : string = this.password.value;

    this.accountService.validateCredentials(email, password).subscribe(
      // After Validation 
      // validCrendentials is a boolean value which was returned from the HTTP request
      validCredentials => {
        if(validCredentials) {
          this.accountService.signIn(this.email.value);
          this.router.navigate([''])
        }
        else{
          // show an error
          this._snackBar.open("Invalid credentials","", {
            panelClass: ["warning-snackbar"]
          });
          this.email.setValue("");
          this.password.setValue("");
        }
      }
    );
  }
}
