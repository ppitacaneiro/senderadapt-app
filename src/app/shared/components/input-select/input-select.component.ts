import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements OnInit {

  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() placeholder: string = '';
  @Output() newItemEvent = new EventEmitter();

  selectValue:string = "";

  constructor() {}

  ngOnInit() {}

  writeValue(obj: any): void {
    this.selectValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  handleChange(event:any) {
    this.selectValue = event.detail.value;
    this.newItemEvent.emit(this.selectValue);
  }
}
