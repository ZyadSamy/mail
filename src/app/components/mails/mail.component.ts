import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.sass'],
})
export class MailComponent implements OnInit {
  email;
  mails;
  mailFolders = [
    { name: 'Inbox', icon: 'inbox', selected: 'selected' },
    { name: 'Sent', icon: 'send' },
    { name: 'Draft', icon: 'drafts' },
    { name: 'Trash', icon: 'delete' },
  ];
  folderSelected = 'Inbox';

  sortingList = [
    { name: 'Date: Newest on top', selected: true, sortingMethod: 'dateDown' },
    { name: 'Date: Oldest on top', selected: false, sortingMethod: 'dateUp' },
  ];
  get sortingMethod() {
    return this.currentSorting.sortingMethod;
  }
  currentSorting = this.sortingList[0]; // default is newest first

  constructor(
    private accountService: AccountService,
    private mailService: MailService,
    private routingService: RoutingService, // redirecting service
    private _snackBar: MatSnackBar // Service for creating prompts
  ) {}

  ngOnInit(): void {
    this.email = this.accountService.signedIn.email;
    this.fetchMails();
  }

  fetchMails() {
    this.mailService
      .getMails(this.folderSelected, this.sortingMethod)
      .subscribe((response) => {
        this.mails = response;
      });
  }

  changeFolder(folderName: string) {
    this.folderSelected = folderName;
    this.fetchMails();
  }

  mailClicked(id) {
    this.routingService.goToMail(id);
  }

  removeMail(mail) {
    this.mailService.removeMail(mail);
    this._snackBar.open('Mail deleted');
    this.fetchMails();
  }

  changeSortingMethod(newSorting) {
    // Uncheck the previous method
    this.currentSorting.selected = false;
    // select the new sortingMethod
    newSorting.selected = true;
    this.currentSorting = newSorting;
    // refresh mails after sorting
    this.fetchMails();
  }

  /* Sidebar functions */
  compose() {
    this.routingService.gotoCompose();
  }
  createFolder() {}
}
