import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewUserComponent } from './create-new-user.component';

const routes: Routes = [{ path: '', component: CreateNewUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewUserRoutingModule { }
