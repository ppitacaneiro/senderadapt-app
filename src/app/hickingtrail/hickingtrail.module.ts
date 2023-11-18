import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { HickingtrailRoutingModule } from './hickingtrail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HickingtrailRoutingModule,
  ],
  declarations: [
    SearchComponent
  ],
})
export class HickingtrailModule { }
