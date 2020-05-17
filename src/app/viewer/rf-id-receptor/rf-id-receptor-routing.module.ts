import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfIdReceptorComponent } from './rf-id-receptor.component';

const routes: Routes = [{ path: '', component: RfIdReceptorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfIdReceptorRoutingModule { }
