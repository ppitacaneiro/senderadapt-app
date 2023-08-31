import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @Input() placeHolderText:string = "";
  @Input() labelText:string = "";
  @Input() typeOfInput:string = "text";
  inputText:string = "";

  constructor() {}

  ngOnInit() {

  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(obj: any): void {
    this.inputText = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

}
