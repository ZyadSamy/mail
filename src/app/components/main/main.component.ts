import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private routingService: RoutingService,
    private http: HttpClient
  ) {}

  email;
  searchList;
  searchText = '';

  ngOnInit(): void {
    this.email = this.accountService.signedIn.email;
  }

  onSignout() {
    this.accountService.signOut();
    // Navigate to sign-in
    this.routingService.gotoSignin();
  }

  gotoContacts() {
    this.routingService.gotoContacts();
  }

  search(text) {
    if (text != '') {
      this.http
        .get('http://localhost:8080/search', {
          params: {
            account: this.accountService.signedIn.email,
            searchInput: text,
          },
        })
        .subscribe((response) => {
          this.searchList = response
        });
    }

  }
  
  searchMailClicked(id) {
    this.routingService.goToMail(id);
  }
}
