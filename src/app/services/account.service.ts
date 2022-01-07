import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailService } from './mail.service';

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

  // getAccountDetails() {
  //   return this.http.get(this.backEndUrl + '/view', {
  //     responseType: 'json',
  //     observe: 'response',
  //     params: {
  //       account: this.signedIn.email,
  //     },
  //   });
  // }

  signIn(email: string) {
    this._signedIn = { status: true, email: email };
  }

  signOut() {
    this._signedIn = { status: false, email: '' };
  }

  signUp(account: { name: string; email: string; password: string }) {
    return this.http.post(`${this.backEndUrl}/accounts/create`, account, {
      responseType: 'json',
      observe: 'body',
    });
  }

  /* Contacts functions */

  getContacts() : Observable<any>{
    return this.http.get(`${this.backEndUrl}/contacts`, {
      params: { user: this.signedIn.email },
    });
  }

  addContact(contact) {
    return this.http.post(`${this.backEndUrl}/contacts/add`, contact, {
      params: {
        user: this.signedIn.email,
      },
    });
  }

  editContact(oldContactName: string, newContactDetails) {
    return this.http.post(
      `${this.backEndUrl}/contacts/edit`,
      newContactDetails,
      {
        params: {
          user: this.signedIn.email,
          oldContactName: oldContactName,
        },
      }
    );
  }

  deleteContact(contact) {
    return this.http.delete(`${this.backEndUrl}/contacts/delete`, {
      params: { user: this.signedIn.email },
      body: contact,
    });
  }
}
