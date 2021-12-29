import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  signedIn: boolean = false;
  signedEmail: string = 'zyad@mail.com';

  constructor() {}

  ngOnInit(): void {}

  onSignIn(email: string) {
    this.signedEmail = email;
    console.log(this.signedEmail);
    this.signedIn = true;
  }
}
