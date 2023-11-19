import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Community } from '../interfaces/community';

@Injectable({
  providedIn: 'root'
})
export class HickingtrailService {

  private baseUrl:string = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

  getCommunities(): Observable<Community[]> {
    return this.httpClient.get<Community[]>(`${this.baseUrl}/communities`);
  }
}
