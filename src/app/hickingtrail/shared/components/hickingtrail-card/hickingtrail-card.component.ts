import { Component, Input, OnInit } from '@angular/core';
import { Hickingtrail } from 'src/app/interfaces/hickingtrail';

@Component({
  selector: 'app-hickingtrail-card',
  templateUrl: './hickingtrail-card.component.html',
  styleUrls: ['./hickingtrail-card.component.scss'],
})
export class HickingtrailCardComponent  implements OnInit {

  @Input() hickingTrail!:Hickingtrail;
  
  constructor() { }

  ngOnInit() {
    console.log(this.hickingTrail);
  }

}
