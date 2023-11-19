import { HickingtrailService } from './../../services/hickingtrail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(private hickingtrailService:HickingtrailService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.hickingtrailService.getCommunities().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
