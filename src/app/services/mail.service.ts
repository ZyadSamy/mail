import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Mail } from '../interfaces/Mail';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router
  ) {}

  backendUrl = 'http://localhost:8080';
  currentMail;
  mails;

  sendMail(mail: Mail, draft: boolean) {
    const receiversArray = mail.receivers.map((currentValue) => {
      return { mailAddresses: currentValue };
    });

    const newMail = {
      sender: {
        mailAddresses: this.accountService.signedIn.email,
      },
      receivers: receiversArray,
      subject: mail.subject,
      body: mail.body,
      date: mail.date,
      type: draft ? 'Draft' : null,
    };
    this.http.post(this.backendUrl + '/mail/create', newMail).subscribe();
  }

  getMail(id: number) {
    return this.http.get('http://localhost:8080/mail/get', {
      params: {
        email: this.accountService.signedIn.email,
        id: id,
      },
    });
  }

  getMails(folder: string, sortMethod: string) {
    return this.http.get(`${this.backendUrl}/mails`, {params: {email : this.accountService.signedIn.email, folder: folder, sortMethod: sortMethod}});
  }

  removeMail(mail) {
    this.http
      .delete('http://localhost:8080/mail/delete', {
        params: {
          account: this.accountService.signedIn.email,
          id: mail.id,
        },
      })
      .subscribe();
  }

  getCurrentMailViewed() {
    return this.currentMail;
  }

  getSortedMails(sortMethod: string) {
    console.log(this.mails)
    return this.http.get(`${this.backendUrl}/sort`, {
      params: {
        account: this.accountService.signedIn.email,
        method: sortMethod,
      },
    });
  }
}

// mock mails
// mails = [
//   {
//     id: 0,
//     subject: 'first mail',
//     sender: 'sender@mail.com',
//     receiver: 'receiver@mail.com',
//     body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, itaque voluptatum autem odit amet dolores eveniet ipsum id voluptatibus quibusdam quas libero numquam. Ipsum necessitatibus itaque suscipit impedit magnam fuga!',
//     date: new Date(),
//     starred: false,
//   },

//   {
//     id: 1,
//     subject: 'second mail',
//     body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, itaque voluptatum autem odit amet dolores eveniet ipsum id voluptatibus quibusdam quas libero numquam. Ipsum necessitatibus itaque suscipit impedit magnam fuga!',
//     date: new Date(),
//     starred: false,
//   },

//   {
//     id: 2,
//     subject: 'starred mail',
//     body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, itaque voluptatum autem odit amet dolores eveniet ipsum id voluptatibus quibusdam quas libero numquam. Ipsum necessitatibus itaque suscipit impedit magnam fuga!',
//     date: new Date(),
//     starred: true,
//   },
// ];
