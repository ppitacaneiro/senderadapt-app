import { SearchResultsComponent } from './search-results/search-results.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { HickingtrailRoutingModule } from './hickingtrail-routing.module';
import { HickingtrailCardComponent } from './shared/components/hickingtrail-card/hickingtrail-card.component';
import { RegisterComponent } from './register/register.component';

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
    SearchComponent,
    SearchResultsComponent,
    HickingtrailCardComponent,
    RegisterComponent
  ],
})
export class HickingtrailModule { }
