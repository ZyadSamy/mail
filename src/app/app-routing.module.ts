import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/sign-up/signup.component';
import { MailDetailsComponent } from './components/mails/mail-details/mail-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ComposeComponent } from './components/compose/compose.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MailComponent } from './components/mails/mail.component';
import { AuthGuard } from './services/auth-gurad';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'mails',
        pathMatch: "full"
      },
      {
        path: 'mails',
        component: MailComponent
      },
      {
        path: 'mails/:id',
        component: MailDetailsComponent
      },
      {
        path: 'compose',
        component: ComposeComponent,
      },
      { path: 'contacts', component: ContactsComponent },
    ],
  },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
