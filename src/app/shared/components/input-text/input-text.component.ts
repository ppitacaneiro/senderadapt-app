import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formErrorsMessages } from '../../constants/errors';
@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent  implements OnInit, ControlValueAccessor {

  @Input() formControl!:FormControl;
  @Input() placeHolderText:string = "";
  @Input() labelText:string = "";
  @Input() typeOfInput:string = "text";
  
  inputText:string = "";
  error:string = '';

  constructor() {}

  ngOnInit() {}

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(obj: any): void {
    this.inputText = obj;

    if (this.formControl.invalid && this.formControl.dirty)
      this.setError();
    else
      this.error = "";
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  setError() {
    if (this.formControl.hasError('required')) {
      this.error = formErrorsMessages.REQUIRED;
    }  
    if (this.formControl.hasError('email')) {
      this.error = formErrorsMessages.EMAIL;
    }  
    if (this.formControl.hasError('minlength')) {
      this.error = formErrorsMessages.MINLENGTH + this.formControl.errors?.['minlength'].requiredLength;
    }  
  }

}
