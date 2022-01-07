import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.sass'],
})
export class MailDetailsComponent implements OnInit {
  mail : any = {
    subject : "",
    from : {mailAddresses : ""},
    receivers : [{mailAddresses : ""}] ,
    body : ""
  };

  constructor(
    private mailService : MailService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private uploadService: UploadFileService
  ) {}

  files?: Observable<any>;
  id;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mailService.getMail(this.id).subscribe(
      response => {
        this.mail= response;
        console.log(this.mail)
      }
    );

    this.files = this.uploadService.getFiles(this.id);

  }

  goBack() {
    this.routingService.returnToMails();
  }

  downloadFile(file) {
    window.open(`http://localhost:8080/files/${file.name}`, '_blank');
  }
}
