import { Search } from 'src/app/interfaces/search';
import { ToastService } from './../../services/toast.service';
import { Province } from 'src/app/interfaces/province';
import { Community } from './../../interfaces/community';
import { HickingtrailService } from './../../services/hickingtrail.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Municipality } from 'src/app/interfaces/municipality';
import { DIFFICULTY_LEVELS } from 'src/app/shared/constants/difficulty-levels';
import { DifficultyLevel } from 'src/app/interfaces/difficulty-level';
import { Router } from '@angular/router';

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
  search:Search = {
    community_id: 0,
    difficulty_level: ''
  };

  constructor(
    private hickingtrailService:HickingtrailService,
    private formBuilder:FormBuilder,
    private toastService:ToastService,
    private router:Router
  ) { }

  searchForm = this.formBuilder.group({
    communitySelect: ['',Validators.required],
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


  register() {
    this.router.navigate(['/hickingtrail/register']);
  }

  onSubmit() {
    if (!this.searchForm.valid) {
      this.toastService.presentToast('Debe seleccionar una comunidad y un nivel de dificultad');
      return;
    }

    this.search.community_id = Number(this.communitySelect?.value);
    this.search.difficulty_level = this.difficultyLevels.find(
      (difficultyLevel) => difficultyLevel.id === Number(this.difficultyLevelSelect?.value)
    )?.value || '';

    if (this.provinceSelect?.value) {
      this.search.province_id = Number(this.provinceSelect?.value);
    }

    if (this.municipalitySelect?.value) {
      this.search.municipality_id = Number(this.municipalitySelect?.value);
    }

    this.router.navigate(['/hickingtrail/search-results'], { queryParams: this.search });

    this.search = {
      community_id: 0,
      difficulty_level: ''
    }
    this.searchForm.reset();
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
