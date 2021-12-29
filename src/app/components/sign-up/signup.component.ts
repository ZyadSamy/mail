import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]], //,Validators.pattern(regex)]
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordCheck()]],
    });
  }

  // Getters for the form fields
  get username() {
    return this.signUpForm.get('username');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  // Makes sure that the password field and confirm-password field is matching
  confirmPasswordCheck(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      try {
        let pass = this.signUpForm.get('password').value;
        let confirmPass = this.signUpForm.get('confirmPassword').value;
        return pass === confirmPass ? null : { notSame: true };
      } catch {
        return null;
      }
    };
  }

  // gets called when signup button is clicked
  onSignup() {
    let account = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('username').value + '@mail.com',
      password: this.signUpForm.get('password').value,
    };

    // Make a POST Request that returns false if there's an account with that username and true if not
    this.accountService.signUp(account).subscribe((accountCreatedSuccesfully) => {
      if (accountCreatedSuccesfully) {
        // show a message
        this._snackBar.open('Account created');
        // redirect to sign-in page
        this.gotoSignin();
      } else {
        // show a message
        this._snackBar.open('This username already exists','', { panelClass: ['warning-snackbar']});
        // reset the username field
        this.username.setValue('');
      }
    });
  }

  gotoSignin() {
    this.router.navigate(['/signin']);
  }
}
