import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Outcome } from 'src/app/payable-tab/outcomes/outcome.model';

@Injectable({
  providedIn: 'root'
})
export class PayableService {

  base_path = 'https://localhost:5000/api/Outcome';

  constructor( public _http: HttpClient) {

   }

     // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
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


   getOutcomes(): Observable<Outcome>
   {
    return this._http
      .get<Outcome>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   postOutcome(outcome: Outcome): Observable<Outcome> {
    return this._http
    .post<Outcome>(this.base_path, JSON.stringify(outcome), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   deleteOutcome(outcomeId: string) {
    return this._http.delete(this.base_path+"/"+outcomeId)
   }

}