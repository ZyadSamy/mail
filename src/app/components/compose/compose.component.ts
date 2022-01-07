import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MailService } from 'src/app/services/mail.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.sass'],
})
export class ComposeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private mailService: MailService,
    private routingService: RoutingService,
    private _snackBar: MatSnackBar,
    private uploadService: UploadFileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.composeForm = this.formBuilder.group({
      to: [''],
      subject: [''],
      body: [''],
    });

    this.accountService.getContacts().subscribe((response) => {
      this.contacts = response;
    });

    this.uploadService.getCounter().subscribe((response) => {
      this.mail_id = response;
    });
  }

  mail_id;
  composeForm: FormGroup;
  receivers = [];
  files = [];
  contacts;

  deleteReceiver(receiver) {
    this.receivers.splice(this.receivers.indexOf(receiver), 1);
  }

  addReceiver() {
    const receiver = this.composeForm.get('to').value;
    if (receiver != '') {
      this.receivers.push(receiver);
    }

    // Reset textbox
    this.composeForm.get('to').setValue('');
  }

  onSend() {
    if (this.validate() == true) {
      let mail = {
        sender: '',
        receivers: this.receivers,
        subject: this.composeForm.get('subject').value,
        body: this.composeForm.get('body').value,
        date: new Date(),
      };

      // Upload Files
      this.uploadFiles();
      // Send mail
      this.mailService.sendMail(mail, false);
      // show a message
      this._snackBar.open('Mail sent');
      // redirect to mails page
      this.routingService.returnToMails();
    }
  }

  saveDraft() {
    let mail = {
      sender: '',
      receivers: this.receivers,
      subject: this.composeForm.get('subject').value,
      body: this.composeForm.get('body').value,
      date: new Date(),
    };

    this.uploadFiles();
    this.mailService.sendMail(mail, true);
  }

  validate(): boolean {
    if (this.receivers.length == 0) {
      this._snackBar.open('Please specify at least one recipient.');
      return false;
    } else if (
      this.composeForm.get('subject').value == '' ||
      this.composeForm.get('body').value == ''
    ) {
      this._snackBar.open("The subject and the body can't be empty.");
      return false;
    }
    return true;
  }

  onClose() {
    this.routingService.returnToMails();
  }

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file,this.mail_id).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        },
      });
    }
  }
}
