import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { Registration } from './registration';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
const baseUrl = 'http://3.231.26.21:8080/'

@Injectable({
  providedIn: 'root'
})

export class ApiConfigService {

  
  getAuthHeaders(){
   httpOptions.headers =httpOptions.headers.set('Accept', 'application/json')
   return httpOptions;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  constructor( private http: HttpClient) { }
  getregistration(regisObj, type): Observable<any>{
    let registerurl = baseUrl+'trajectory/register/'+type;
    return this.http.post(registerurl, regisObj, this.getAuthHeaders())
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // );

  }
}
