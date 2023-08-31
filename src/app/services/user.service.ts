import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

  register(user:User):Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`,user).pipe(
      res => res
      // TODO: Handle error
    );
  }

}
