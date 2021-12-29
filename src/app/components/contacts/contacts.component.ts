import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
})
export class ContactsComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {}

  contactForm;
  account;
  contacts = [
    {
      name: 'Zyad',
      mailAddresses: 'zyad@mail.com',
    },
    {
      name: 'name',
      mailAddresses: 'account1@mail.com',
    },
    {
      name: 'name2',
      mailAddresses: 'account2@mail.com',
    },
    {
      name: 'name2',
      mailAddresses: 'account2@mail.com',
    },
    {
      name: 'name2',
      mailAddresses: 'account2@mail.com',
    },
  ];

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
    });

    this.accountService.getAccountDetails().subscribe(
      response => {
        this.account = response.body;
        this.contacts = this.account.contacts;
      }
    )
  }

  onAdd() {
    let name = this.contactForm.get('name').value;
    let email = this.contactForm.get('email').value;

    if(name != "" || email != "") {
      this.contacts.push(
        {
          name : name,
          mailAddresses: email
        }
      )
    }
  }

  onDelete(contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1)
  }

  onEdit(contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1)
    this.contactForm.get('name').setValue(contact.name);
    this.contactForm.get('email').setValue(contact.mailAddresses);
  }
}
