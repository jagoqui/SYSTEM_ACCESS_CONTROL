import { environment } from './../environments/environment';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalFormUserComponent } from './shared/modal-form-user/modal-form-user.component';
import { TableUserDataViewComponent } from './shared/table-user-data-view/table-user-data-view.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore} from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent, NavbarComponent, ModalFormUserComponent, TableUserDataViewComponent, SendEmailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
