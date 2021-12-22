import { Component, OnInit } from '@angular/core';
import { mailFolders } from './mails-folders';
import { Mail } from './Mail';
import { mails } from './mails';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.sass']
})
export class MailComponent implements OnInit {
  
  mailFolders = mailFolders;
  account = {
    "name" : "Zyad",
  }

  mails : Mail[] = mails;

  constructor() { }

  ngOnInit(): void {

  }

}
