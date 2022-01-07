import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatRippleModule } from '@angular/material/core';
import { SignupComponent } from './components/sign-up/signup.component';
import { MailComponent } from './components/mails/mail.component';
import { HttpClientModule } from '@angular/common/http';
import { MailDetailsComponent } from './components/mails/mail-details/mail-details.component';
import { ComposeComponent } from './components/compose/compose.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignupComponent,
    MailComponent,
    MailDetailsComponent,
    ComposeComponent,
    ContactsComponent,
    MainComponent,
    PageNotFoundComponent,
    EditContactComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    MatRippleModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
