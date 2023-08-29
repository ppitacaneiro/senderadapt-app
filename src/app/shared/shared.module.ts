import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    NavbarComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
  ]
})
export class SharedModule { }
