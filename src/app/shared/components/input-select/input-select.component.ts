import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent  implements OnInit {

  @Input() label: string = '';
  @Input() valueOption: string = '';
  @Input() labelOption: string = '';
  @Input() options: any[] = [];
  @Input() placeholder: string = '';

  constructor() {}

  ngOnInit() {
    this.buildOptions();
  }

  buildOptions() {
    console.log('options',this.options);
    this.options = this.options.map((option) => {
      return {
        value: option[this.valueOption],
        label: option[this.labelOption],
      };
    });
    console.log('options2',this.options);
  }

}
