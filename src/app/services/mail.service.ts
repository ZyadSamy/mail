import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router : Router
  ) {}

  backendUrl = 'http://localhost:8080';
  currentMail;
  account;
  mails;

  sendMail(mail: {
    sender: string;
    receivers: string[];
    subject: string;
    body: string;
  }) {
    const receiversArray = mail.receivers.map((currentValue) => {
      return { mailAddresses: currentValue };
    });

    const newMail = {
      sender: {
        // mailAddresses : this.accountService.signedIn.email
        mailAddresses: 'zyad@mail.com',
      },
      receivers: receiversArray,
      subject: mail.subject,
      body: mail.body,
    };
    console.log(newMail);
    this.http.post(this.backendUrl + '/mail/create', newMail).subscribe();
  }

  getMail(id: number) {
    console.log(this.mails)
  }


  removeMail(mail: any) {
    this.mails.splice(this.mails.indexOf(mail), 1);
  }

  getCurrentMailViewed() {
    return this.currentMail;
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
