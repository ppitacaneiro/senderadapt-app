import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { InputTextComponent } from './components/input-text/input-text.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { FormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { MenunavbarComponent } from './components/menunavbar/menunavbar.component';
import { InputSelectComponent } from './components/input-select/input-select.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
    FormErrorsComponent,
    MenunavbarComponent,
    InputSelectComponent
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
    FormErrorsComponent,
    MenunavbarComponent,
    InputSelectComponent
  ]
})
export class SharedModule { }
