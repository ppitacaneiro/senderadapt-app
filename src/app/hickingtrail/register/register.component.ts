import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'src/app/interfaces/community';
import { DifficultyLevel } from 'src/app/interfaces/difficulty-level';
import { Municipality } from 'src/app/interfaces/municipality';
import { Province } from 'src/app/interfaces/province';
import { Search } from 'src/app/interfaces/search';
import { HickingtrailService } from 'src/app/services/hickingtrail.service';
import { StorageService } from 'src/app/services/storage.service';
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
    private router:Router,
    private storageService: StorageService,
  ) { }

  searchForm = this.formBuilder.group({
    community_id: ['',Validators.required],
    province_id: ['', Validators.required],
    municipality_id: ['', Validators.required],
    difficulty_level: ['',Validators.required],
    origin_name: ['',Validators.required],
    destination_name: ['',Validators.required],
  });

  get communitySelect() { return this.searchForm.get('community_id'); }
  get provinceSelect() { return this.searchForm.get('province_id'); }
  get municipalitySelect() { return this.searchForm.get('municipality_id'); }
  get difficultyLevelSelect() { return this.searchForm.get('difficulty_level'); }

  
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
    if (!this.searchForm.valid) {
      this.toastService.presentToast('Todos los campos del formulario son obligatios para continuar');
      return;
    }

    
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
