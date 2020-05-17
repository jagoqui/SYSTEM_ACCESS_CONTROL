import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateNewUserRoutingModule } from './create-new-user-routing.module';
import { CreateNewUserComponent } from './create-new-user.component';


@NgModule({
  declarations: [CreateNewUserComponent],
  imports: [
    CommonModule,
    CreateNewUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateNewUserModule { }
