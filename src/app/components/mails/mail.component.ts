import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.sass'],
})
export class MailComponent implements OnInit {
  @Input('email') accountEmail = '';

  email = 'zyad@mail.com';
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
    private _snackBar: MatSnackBar // Service for creating prompts
  ) {}

  ngOnInit(): void {
    this.mailService.getAccountDetails(this.email).subscribe((response) => {
      console.log(response);
      this.account = response.body;
      this.mails = this.account.mails;
      console.log(this.mails);
    });
  }

  onSignout() {
    this.accountService.signOut();
    // Navigate to sign-in
    this.router.navigate(['/signin']);
  }

  changeFolder(folderName: string) {
    this.folderSelected = folderName;
  }

  mailClicked(e, mail) {
    if (this.curViewedMail == mail) {
      this.mailIsViewed = !this.mailIsViewed;
      this.curViewedMail = {};
    } else {
      this.mailIsViewed = true;
      this.curViewedMail = mail;
    }
  }

  removeMail(mail) {
    this.mailService.removeMail(mail);
  }

  compose() {}
}
