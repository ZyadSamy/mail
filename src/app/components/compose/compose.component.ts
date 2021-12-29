import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.sass'],
})
export class ComposeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  public formData = new FormData();
  ReqJson: any = {};

  uploadFiles(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      this.formData.append('file', files[i], files[i]['name']);
      this.files.push(files[i]['name'])
    }
    this.formData.forEach( data => {console.log(data)})
  }

  addFiles() {}

  RequestUpload() {
    this.ReqJson['mailID'] = '12';
    this.formData.append('Info', JSON.stringify(this.ReqJson));
    this.formData.forEach( data => {console.log(data)})

    this.formData.forEach(file => {
      this.http
        .post('http://localhost:8080/file/upload', file)
        .subscribe(() => {});
    })
  }

  composeForm: FormGroup;
  receivers = ['account1@mail.com', 'account2@mail.com'];
  files = ['file1.pdf', 'file2.pdf'];

  ngOnInit(): void {
    this.composeForm = this.formBuilder.group({
      to: [''],
      subject: [''],
      body: [''],
    });
  }

  deleteFile(file: string) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  deleteReceiver(receiver) {
    this.receivers.splice(this.receivers.indexOf(receiver), 1);
  }

  addReceiver() {
    const receiver = this.composeForm.get('to').value;
    if (receiver != '') {
      this.receivers.push(receiver);
    }
  }

  onSend() {
    if (this.validate() == true) {
      let mail = {
        sender: '',
        receivers: this.receivers,
        subject: this.composeForm.get('subject').value,
        body: this.composeForm.get('body').value,
      };

      this.mailService.sendMail(mail);
    }
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
}
