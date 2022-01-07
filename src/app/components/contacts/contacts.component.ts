import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { RoutingService } from 'src/app/services/routing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
})
export class ContactsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routingService: RoutingService,
    private editContactDialog: MatDialog,
  ) {}

  contactForm;
  account;
  contacts;
  
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
    });

    this.fetchContacts();
  }
  
  fetchContacts() {
    this.accountService.getContacts().subscribe((response) => {
      this.contacts = response;
    });
  }

  onAdd() {
    let name = this.contactForm.get('name').value;
    let email = this.contactForm.get('email').value;

    if (name != '' || email != '') {
      const contact = {
        name: name,
        mailAddresses: email,
      };

      if (this.contacts == null) {
        this.contacts = [];
      }
      this.contacts.push(contact);
      this.accountService.addContact(contact).subscribe();
    }

    // Reset textboxes
    this.contactForm.get('name').setValue('');
    this.contactForm.get('email').setValue('');
  }

  onDelete(contact) {
    this.accountService.deleteContact(contact).subscribe(() => {this.fetchContacts();});
  }

  onEdit(contact) {
    let oldContactName = contact.name;
    let dialogRef = this.editContactDialog.open(EditContactComponent, {
      data: contact,
    });

    dialogRef.afterClosed().subscribe((dialogData) => {
      // Checks that the dialog returned a value (wasn't canceled)
      if (dialogData != undefined) {
        this.accountService.editContact(oldContactName, dialogData).subscribe();
      }
      else{
        this.fetchContacts();
      }
    });
  }


  goBack() {
    this.routingService.returnToMails();
  }
}
