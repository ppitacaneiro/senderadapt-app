import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'src/app/interfaces/community';
import { DifficultyLevel } from 'src/app/interfaces/difficulty-level';
import { Municipality } from 'src/app/interfaces/municipality';
import { Province } from 'src/app/interfaces/province';
import { Search } from 'src/app/interfaces/search';
import { HickingtrailService } from 'src/app/services/hickingtrail.service';
import { ToastService } from 'src/app/services/toast.service';
import { DIFFICULTY_LEVELS } from 'src/app/shared/constants/difficulty-levels';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

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
    difficultyLevelSelect: ['',Validators.required],
    originName: ['',Validators.required],
    destinationName: ['',Validators.required],
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

  onSubmit() {}

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
