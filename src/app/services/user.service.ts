import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable, catchError, of, throwError } from 'rxjs';
import { serverErrorsMessages } from '../shared/constants/errors';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

  register(user:User):Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`,user).pipe(
      res => res,
      catchError(err => this.handleError(err))
    );
  }

  login(email:string,password:string):Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`,{
      email:email,
      password:password
    }).pipe(
      res => res,
      catchError(err => this.handleError(err))
    );
  }

  // TODO: Refactor with http interceptor
  private handleError(error:any):Observable<string> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = this.handleServerSideError(error.status);
    }
    return throwError(() => errorMessage);
  }

  handleServerSideError(status:number) {
    switch (status) {
      case 401:
        return serverErrorsMessages.SERVER_RESPONSE_401;
      case 404:
        return serverErrorsMessages.SERVER_RESPONSE_404;
      case 500:
        return serverErrorsMessages.SERVER_RESPONSE_500;
      default:
        return serverErrorsMessages.DEFAULT;
    }
  }

  // TODO: implement logout
}
