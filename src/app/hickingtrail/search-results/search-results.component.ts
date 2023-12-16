import { Hickingtrail } from './../../interfaces/hickingtrail';
import { HickingtrailService } from './../../services/hickingtrail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent  implements OnInit {

  isLoading:boolean = true;
  hickingTrails:Hickingtrail[] = [];
  constructor(
    private route:ActivatedRoute,
    private hickingtrailService:HickingtrailService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.route.queryParams.subscribe(params => {
      this.hickingtrailService.searchHickingTrails(params).subscribe({
        next: (data) => {
          this.hickingTrails = data;
        },
        error: (error) => {
          console.log('error recuperando listado de senderos',error);
        },
        complete: () => {
          this.isLoading = false;
        }
      }); 
    });
  }

}
