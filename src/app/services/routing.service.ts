import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  returnToMails() {
    this.router.navigate(['/mails']); 
  }

  goToMail(id: number) {
    this.router.navigate(['/mails/']);
    this.router.navigate(['/mails/' + id]);
  }

  gotoSignin() {
    this.router.navigate(['/signin'])
  }

  gotoContacts() {
    this.router.navigate(['/contacts'])
  }

  gotoCompose() {
    this.router.navigate(['/compose'])
  }
}
