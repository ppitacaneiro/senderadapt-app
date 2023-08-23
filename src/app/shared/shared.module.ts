import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { InputTextComponent } from './components/input-text/input-text.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    NavbarComponent,
    InputTextComponent
  ]
})
export class SharedModule { }
