import { Component, OnInit } from '@angular/core';
import { mails } from '../mails';
import { Mail } from '../Mail';

@Component({
  selector: 'app-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.sass']
})
export class MailViewComponent implements OnInit {
  mails = mails;

  constructor() { }

  ngOnInit(): void {
  }

}
