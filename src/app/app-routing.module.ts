import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/sign-up/signup.component';
import { MainComponent } from './components/main/main.component';
import { MailDetailsComponent } from './components/mail-details/mail-details.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ComposeComponent } from './components/compose/compose.component';

const routes: Routes = [
  { path: '', component: MainComponent, 
    children: [
      { 
        path: 'mails/:id',
        component : MailDetailsComponent 
      },
      {
        path : 'compose',
        component: ComposeComponent
      }
    ] 
  },
  { path: 'signin' , component: SignInComponent},
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
