import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.sass'],
})
export class MailDetailsComponent implements OnInit {
  @Input() mail;

  constructor(private accountService : AccountService, private route : ActivatedRoute, private routingService : RoutingService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params["id"])
    this.mail = 
      this.accountService.getMail(this.route.snapshot.params["id"])
  }

  goBack() {
    this.routingService.returnToMails();
  }
}
