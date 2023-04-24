import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Outcome } from 'src/app/payable-tab/outcomes/outcome.model';
import { Income } from '../../incomes/income.model';

@Injectable({
  providedIn: 'root'
})
export class PayableService {

  base_path_outcomes = 'https://localhost:5000/api/Outcome';
  base_path_incomes = 'https://localhost:5000/api/Income';

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
      .get<Outcome>(this.base_path_outcomes)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   getIncomes(): Observable<Outcome>
   {
    return this._http
      .get<Outcome>(this.base_path_incomes)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   getOutcomeById(id: string) {
    return this._http
      .get<Outcome>(this.base_path_outcomes+"/"+id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   getIncomeById(id: string) {
    return this._http
      .get<Outcome>(this.base_path_incomes+"/"+id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   GetOutcomesByFilters(createdAt: string, category: string): Observable<Outcome>
   {
    console.log("BY DATE 🍭", this.base_path_outcomes+"/GetOutcomesByFilters/"+createdAt+"/"+category);
    
    return this._http
      .get<Outcome>(this.base_path_outcomes+"/GetOutcomesByFilters/"+createdAt+"/"+category)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   GetIncomesByFilters(createdAt: string, category: string): Observable<Outcome>
   {
    console.log("BY DATE 🍭", this.base_path_incomes+"/GetIncomesByFilters/"+createdAt+"/"+category);
    
    return this._http
      .get<Outcome>(this.base_path_incomes+"/GetIncomesByFilters/"+createdAt+"/"+category)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   GetOutcomesByDay(createdAt: string): Observable<Outcome>
   {
    console.log("BY DATE 🍭", this.base_path_outcomes+"/GetOutcomesByDay/"+createdAt);
    
    return this._http
      .get<Outcome>(this.base_path_outcomes+"/GetOutcomesByDay/"+createdAt)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   GetOutcomesBySearch(createdAt: string, description: string): Observable<Outcome>
   {
    console.log("BY DATE 🍭",this.base_path_outcomes+"/GetOutcomeBySearch/"+createdAt+"?description="+description)

    return this._http
    .get<Outcome>(this.base_path_outcomes+"/GetOutcomeBySearch/"+createdAt+"?description="+description)
    // .get<Outcome>(this.base_path_outcomes+"/GetOutcomeBySearch/"+createdAt+"?description="+description")
    // ?createdDate=3-2-3023&description=testinggggg.
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   GetOutcomesByWeek(): Observable<Outcome>
   {
    console.log("BY WEEK 🍭", this.base_path_outcomes+"/GetOutcomesByWeek");
    
    return this._http
      .get<Outcome>(this.base_path_outcomes+"/GetOutcomesByWeek")
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

     // https://localhost:5000/api/Income/GetIncomesByWeek
   GetIncomesByWeek(): Observable<Income> {
    console.log("BY WEEK 🍭", this.base_path_incomes+"/GetIncomesByWeek");
    
    return this._http
      .get<Outcome>(this.base_path_incomes+"/GetIncomesByWeek")
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
   }

   postOutcome(outcome: Outcome): Observable<Outcome> {
    return this._http
    .post<Outcome>(this.base_path_outcomes, JSON.stringify(outcome), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   postIncome(income: Income): Observable<Income> {
    return this._http
    .post<Income>(this.base_path_incomes, JSON.stringify(income), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   putOutcome(outcomeId: string, outcome: Outcome): Observable<Outcome> {
    return this._http
    .put<Outcome>(this.base_path_outcomes+"/"+outcomeId, JSON.stringify(outcome), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   putIncome(incomeId: string, income: Income): Observable<Income> {
    return this._http
    .put<Income>(this.base_path_incomes+"/"+incomeId, JSON.stringify(income), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
   }

   deleteOutcome(outcomeId: string) {
    return this._http.delete(this.base_path_outcomes+"/"+outcomeId)
   }

   deleteIncome(incomeId: string) {
    return this._http.delete(this.base_path_incomes+"/"+incomeId)
   }

}
