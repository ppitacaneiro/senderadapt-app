import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'src/app/interfaces/community';
import { DifficultyLevel } from 'src/app/interfaces/difficulty-level';
import { HickingtrailRegister } from 'src/app/interfaces/hickingtrail-register';
import { Municipality } from 'src/app/interfaces/municipality';
import { Province } from 'src/app/interfaces/province';
import { Search } from 'src/app/interfaces/search';
import { HickingtrailService } from 'src/app/services/hickingtrail.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { DIFFICULTY_LEVELS } from 'src/app/shared/constants/difficulty-levels';
import { v4 as uuidv4 } from 'uuid';

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
  hickingtrailRegister: HickingtrailRegister = {
    user_id: 0,
    community_id: 0,
    province_id: 0,
    municipality_id: 0,
    origin_name: '',
    destination_name: '',
    difficulty_level: '',
    photos: [],
  }

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

    this.storageService.get('user').then((user) => {
      this.hickingtrailRegister.uuid = uuidv4();
      this.hickingtrailRegister.user_id = user.id;
      this.hickingtrailRegister.community_id = Number(this.searchForm.value.community_id);
      this.hickingtrailRegister.province_id = Number(this.searchForm.value.province_id);
      this.hickingtrailRegister.municipality_id = Number(this.searchForm.value.municipality_id);
      this.hickingtrailRegister.origin_name = this.searchForm.value.origin_name!;
      this.hickingtrailRegister.destination_name = this.searchForm.value.destination_name!;
      this.hickingtrailRegister.difficulty_level = this.difficultyLevels.find(
        (difficultyLevel) => difficultyLevel.id === Number(this.difficultyLevelSelect?.value)
      )?.value || '';

      this.storageService.set('hickingtrails',[this.hickingtrailRegister])
        .then(() => {
          this.router.navigate(['/hickingtrail/steps', this.hickingtrailRegister.uuid]);
        })
        .catch((err) => {
          console.log('error guardando hickingtrail',err);
        });
    });
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
