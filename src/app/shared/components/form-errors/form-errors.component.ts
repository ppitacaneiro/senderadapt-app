import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent  implements OnInit {

  @Input() error:string = '';

  constructor() { }

  ngOnInit(): void {}

}
