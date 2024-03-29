import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Community } from '../interfaces/community';
import { Province } from '../interfaces/province';
import { HickingtrailRegister } from '../interfaces/hickingtrail-register';

@Injectable({
  providedIn: 'root'
})
export class HickingtrailService {

  private baseUrl:string = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

  getCommunities(): Observable<Community[]> {
    return this.httpClient.get<Community[]>(`${this.baseUrl}/communities`);
  }

  getProvinces(idCommunity:number): Observable<Province[]> {
    return this.httpClient.get<Province[]>(`${this.baseUrl}/provinces/${idCommunity}`);
  }

  getMunicipalities(idProvince:number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/municipalities/${idProvince}`);
  }

  searchHickingTrails(searchParams:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/hicking_trails/search`,searchParams);
  }

  saveHickingTrail(hickingtrail:HickingtrailRegister): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/hicking_trails/store`,hickingtrail);
  }
}
