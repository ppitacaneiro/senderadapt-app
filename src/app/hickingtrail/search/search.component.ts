import { Province } from 'src/app/interfaces/province';
import { Community } from './../../interfaces/community';
import { HickingtrailService } from './../../services/hickingtrail.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Municipality } from 'src/app/interfaces/municipality';
import { DIFFICULTY_LEVELS } from 'src/app/shared/constants/difficulty-levels';
import { DifficultyLevel } from 'src/app/interfaces/difficulty-level';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  communities:Community[] = [];
  provinces:Province[] = [];
  municipalities:Municipality[] = [];
  difficultyLevels:DifficultyLevel[] = DIFFICULTY_LEVELS;
  isLoading:boolean = true;

  constructor(
    private hickingtrailService:HickingtrailService,
    private formBuilder:FormBuilder,
  ) { }

  searchForm = this.formBuilder.group({
    communitySelect: [''],
    provinceSelect: [''],
    municipalitySelect: [''],
    difficultyLevelSelect: ['',Validators.required]
  });

  get communitySelect() { return this.searchForm.get('communitySelect'); }
  get provinceSelect() { return this.searchForm.get('provinceSelect'); }
  get municipalitySelect() { return this.searchForm.get('municipalitySelect'); }
  get difficultyLevelSelect() { return this.searchForm.get('difficultyLevelSelect'); }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.hickingtrailService.getCommunities().subscribe({
      next: (data) => {
        this.communities = data;
      },
      error: (error) => {
        console.log('error recuperando listado de comunidades',error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  onNewCommunity(idCommunity:number) {
    this.hickingtrailService.getProvinces(idCommunity).subscribe({
      next: (data) => {
        this.provinces = data;
      },
      error: (error) => {
        console.log('error recuperando listado de provincias',error);
      }
    });
  }

  onNewProvince(idProvince:number) {
    this.hickingtrailService.getMunicipalities(idProvince).subscribe({
      next: (data) => {
        this.municipalities = data;
      },
      error: (error) => {
        console.log('error recuperando listado de municipios',error);
      }
    });
  }

}
