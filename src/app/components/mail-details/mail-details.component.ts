import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.sass'],
})
export class MailDetailsComponent implements OnInit {
  @Input() mail;

  constructor(private mailService: MailService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.mail = 
      this.mailService.getMail(this.route.snapshot.params["id"])
      console.log(this.route.snapshot.params['id'])
  }
}
