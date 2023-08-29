import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
  ]
})
export class SharedModule { }
