import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailService } from './mail.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private readonly backEndUrl = 'http://localhost:8080';

  // TEMP
  private _signedIn = {
    status: true,
    email: 'account2@mail.com',
  };
  // private _signedIn = {
  //   status: false,
  //   email: '',
  // };
  account;

  get signedIn() {
    return this._signedIn;
  }

  validateCredentials(email: string, password: string) {
    return this.http.post(
      this.backEndUrl + '/accounts/validate',
      { email, password },
      {
        responseType: 'json',
        observe: 'body',
      }
    );
  }

  getAccountDetails() {
    return this.http.get(this.backEndUrl + '/view', {
      responseType: 'json',
      observe: 'response',
      params: {
        account: this.signedIn.email,
      },
    });
  }


  getMail(id: number) {
    console.log(this.account.mails)
    console.log(id)
    for (let i = 0; i < this.account.mails.length; i++) {
      const element = this.account.mails[i];
      if(element.id == id){
        return element
      }
    }
    console.log("error")
    return null
  }

  signIn(email: string) {
    this._signedIn = { status: true, email: email };
    this.getAccountDetails().subscribe((response) => {
      this.account = response.body;
      console.log('Account', this.account);
    });
  }

  signOut() {
    this._signedIn = { status: false, email: '' };
  }

  signUp(account: { name: string; email: string; password: string }) {
    let url = this.backEndUrl + '/accounts/create';
    return this.http.post(url, account, {
      responseType: 'json',
      observe: 'body',
    });
  }


  addContact(name : string, email : string) {
    let url = this.backEndUrl + '/accounts/create';
    this.http.post(url, {name : name, emailAddresses: email}, {
      responseType: 'json',
      observe: 'body',
    }).subscribe();
  }
}
