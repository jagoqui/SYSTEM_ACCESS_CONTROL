import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RfIdReceptorRoutingModule } from './rf-id-receptor-routing.module';
import { RfIdReceptorComponent } from './rf-id-receptor.component';

@NgModule({
  declarations: [RfIdReceptorComponent],
  imports: [
    CommonModule,
    RfIdReceptorRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RfIdReceptorModule { }
