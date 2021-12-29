import { JsonpClientBackend } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.sass'],
})
export class MailComponent implements OnInit {
  email = 'a@mail.com';
  folderSelected = 'Inbox';
  account;
  mails;
  mailFolders = [
    { name: 'Inbox', icon: 'inbox', selected: 'selected' },
    { name: 'Starred', icon: 'star' },
    { name: 'Sent', icon: 'send' },
    { name: 'Drafts', icon: 'drafts' },
    { name: 'Trash', icon: 'delete' },
  ];

  mailIsViewed = false;
  curViewedMail = {};

  sortingList = [
    { name: 'Date: Newest on top', selected: true },
    { name: 'Date: Oldest on top', selected: false },
  ];

  constructor(
    private accountService: AccountService,
    private mailService: MailService,
    private router: Router,
    private routingService : RoutingService,
    private _snackBar: MatSnackBar // Service for creating prompts
  ) {}

  ngOnInit(): void {
    this.email = this.accountService.signedIn.email;
    this.accountService.getAccountDetails().subscribe((response) => {
      this.account = response.body;
      this.mails = this.account.mails;
    });
  }

  

  changeFolder(folderName: string) {
    this.folderSelected = folderName;
  }

  mailClicked(id) {
    this.routingService.goToMail(id);
  }

  removeMail(mail) {
    this.mailService.removeMail(mail);
  }

  compose() {}
}
