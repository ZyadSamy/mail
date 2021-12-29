import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private readonly backEndUrl = 'http://localhost:8080';
  private _signedIn = {
    status: false,
    email: '',
  };

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

  signIn(email: string) {
    this._signedIn = { status: true, email: email };
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
}
